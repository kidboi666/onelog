# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

One Log is a journaling and TODO management web application built with Next.js 16 and Feature-Sliced Design architecture.

## Tech Stack

- **Framework**: Next.js 16.0.0 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **UI**: React 19.2.0, shadcn/ui (Radix UI primitives), Tailwind CSS v4
- **State Management**: Zustand, TanStack Query v5
- **Backend**: Supabase (auth, database)
- **Rich Text**: Tiptap with Markdown support
- **Forms**: React Hook Form + Zod
- **Linting**: Biome (replaces ESLint/Prettier)

## Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Build & Production
npm run build           # Production build
npm start               # Start production server

# Code Quality
npm run lint            # Run Biome linter
npm run format          # Format code with Biome
```

## Architecture: Feature-Sliced Design (FSD)

The codebase follows Feature-Sliced Design with these layers:

```
src/
├── app/                    # Next.js App Router (routes, layouts, pages)
│   ├── _providers/         # React Query, theme providers
│   ├── _store/             # Zustand global stores
│   └── (playground)/       # Main app route group
│
├── entities/               # Business entities (data models, API)
│   ├── auth/              # Authentication entity
│   ├── comment/           # Comments
│   ├── follow/            # Follow relationships
│   ├── post/              # Posts/journals
│   └── user/              # User profiles
│   # Each entity has: api/, model/, lib/
│
├── features/              # Feature modules (user actions)
│   ├── auth/ui/          # Auth dialogs (SignIn, SignUp, AuthGuard)
│   ├── post/ui/          # Post actions (Delete, Report dialogs)
│   ├── comment/ui/       # Comment actions
│   └── follow/ui/        # Follow dialogs (Follower/Following lists)
│
├── shared/               # Shared utilities
│   ├── components/ui/    # shadcn/ui components
│   ├── lib/             # Supabase, TanStack Query, Axios configs
│   ├── types/           # Global TypeScript types
│   ├── hooks/           # Reusable React hooks
│   ├── utils/           # Utility functions
│   ├── routes/          # Route constants
│   └── middlewares/     # Next.js middleware (auth-guard, x-pathname)
│
├── widgets/             # Composite UI components
│   ├── header/ui/      # App header
│   └── sidebar/ui/     # Navigation sidebar
│
└── hooks/              # Global data hooks
    ├── queries/        # TanStack Query hooks
    └── mutates/        # Mutation hooks
```

### FSD Layer Rules

- **entities/**: Pure data layer - API calls, models, business logic
- **features/**: User-facing features - UI components for specific actions
- **widgets/**: Complex composite components combining features/entities
- **shared/**: Reusable utilities, no business logic
- **app/**: Routes and app-level configuration only

### Import Direction

```
app → widgets → features → entities → shared
```

Lower layers cannot import from higher layers.

## Key Patterns

### 1. Entity Structure

Each entity follows this pattern:

```
entities/[entity]/
├── api/
│   ├── queries.ts      # TanStack Query queryOptions
│   ├── mutates.ts      # Mutation hooks
│   └── dtos.ts         # API request/response types
├── model/
│   └── types.ts        # Domain types
└── lib/
    └── [entity]-service.ts  # Business logic
```

### 2. Supabase Clients

- **Server Components**: Use `createServerClient()` from `@/shared/lib/supabase/create-server-client`
- **Client Components**: Use `createBrowserClient()` from `@/shared/lib/supabase/create-browser-client`

Server client handles cookies via Next.js headers/cookies. Browser client uses browser storage.

### 3. TanStack Query Pattern

Use `queryOptions` factory pattern for type-safe queries:

```typescript
// entities/post/api/queries.ts
export const postQueries = {
  getPost: (id: string) => queryOptions({
    queryKey: ["post", id],
    queryFn: async () => getPost(id),
  }),
}

// Usage in component
const { data } = useSuspenseQuery(postQueries.getPost(postId))
```

### 4. Route Constants

All routes defined in `@/shared/routes/constants.ts`:

```typescript
ROUTES.POST.VIEW(postId)           // /post/[postId]
ROUTES.MODAL.POST.DELETE(postId)   // /modal/delete_post/[postId]
```

Never hardcode routes - always use ROUTES constants.

### 5. Dialog Components (New Pattern)

Dialogs live in `features/[domain]/ui/` as reusable components:

```typescript
// features/post/ui/DeletePostDialog.tsx
export function DeletePostDialog({
  postId,
  children
}: {
  postId: number
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {/* Dialog content */}
      </DialogContent>
    </Dialog>
  )
}

// Usage
<DeletePostDialog postId={123}>
  <button>Delete</button>
</DeletePostDialog>
```

**Do not** create route-based modals in `/modal/`. Use component-based dialogs with DialogTrigger.

### 6. Type System

- **EmotionLevel**: Union type `0 | 25 | 50 | 75 | 100` (not string enum)
- **PostType**: Enum for "JOURNAL" | "ARTICLE"
- **Access**: Enum for "PUBLIC" | "PRIVATE" | "FOLLOW"

All enums in `@/shared/types/enums.ts`.

## Middleware

- **auth-guard.ts**: Protects routes, redirects unauthenticated users
- **x-pathname.ts**: Adds current pathname to headers for server components

Applied in Next.js middleware.

## Environment Variables

Required `.env.local`:
- Supabase URL and keys
- Any API endpoints

Check existing env usage in `@/shared/lib/supabase/` for examples.

## Important Notes

- **React Compiler**: Enabled (babel-plugin-react-compiler) - avoid manual memo optimization
- **Turbopack**: Default for `next dev` - faster than webpack
- **Tailwind v4**: Uses new PostCSS plugin, not old config
- **Biome**: Replaces ESLint/Prettier - use `npm run lint` and `npm run format`
- **Strict TypeScript**: All code must pass strict type checking
- **Server Components**: Default - only add `"use client"` when necessary (hooks, events, state)

## Component Patterns

### Server Components (default)

```typescript
// No "use client" directive
async function PostPage({ params }: { params: { postId: string } }) {
  const supabase = createServerClient()
  const post = await getPost(params.postId, supabase)
  return <PostView post={post} />
}
```

### Client Components

```typescript
"use client"

function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### Form Components

Always use React Hook Form + Zod:

```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

## Common Pitfalls

1. **Don't** import from higher FSD layers (e.g., entities importing from features)
2. **Don't** create route-based modals - use Dialog components with triggers
3. **Don't** hardcode routes - use ROUTES constants
4. **Don't** use string values for EmotionLevel - use numeric literals
5. **Don't** create Server/Client component mismatches - async components are server-only
6. **Don't** use `useEffect` for data fetching - use TanStack Query
7. **Don't** use old Tailwind config patterns - v4 uses PostCSS plugin

## Git Commit Conventions

### Commit Message Format

Follow the Conventional Commits specification:

```
<type>: <subject>

[optional body]
```

**DO NOT include:**
- ❌ Claude Code attribution footer
- ❌ Co-Authored-By: Claude
- ❌ "Generated with Claude Code" message

### Types

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring (no functionality change)
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvements

### Examples

```bash
# Good commits
feat: add post detail view component
fix: resolve React key warning in comment list
refactor: migrate post components to FSD structure
docs: update naming conventions in CLAUDE.md
style: format code with Biome

# Bad commits (don't include attribution)
feat: add post detail view component

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Subject Guidelines

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Keep under 72 characters
- Be concise but descriptive

### Body Guidelines (Optional)

- Separate from subject with blank line
- Explain **what** and **why**, not **how**
- Use bullet points for multiple changes
- Wrap at 72 characters

### Example with Body

```bash
refactor: migrate post page components to FSD structure

- Move data display components to entities/post/ui/
- Move user action components to features/post/ui/
- Create composite components in widgets/post/ui/
- Update imports to use new kebab-case file names

This change improves code organization and maintainability
by following Feature-Sliced Design principles.
```

## File Naming Conventions

### General Rules

All file names use **kebab-case** (lowercase with hyphens):

```
✅ Good
post-detail-view.tsx
user-avatar-menu.tsx
format-date-utils.ts
use-post-form.ts

❌ Bad
PostDetailView.tsx
UserAvatarMenu.tsx
formatDateUtils.ts
usePostForm.ts
```

### Specific Rules by File Type

#### Components (`.tsx`)
- **Format**: `[domain]-[descriptor]-[type].tsx`
- **Always kebab-case**
- Include component type suffix when applicable

```typescript
// Entities (data display)
entities/post/ui/post-header-info.tsx
entities/post/ui/post-content.tsx
entities/user/ui/user-avatar.tsx

// Features (user actions)
features/post/ui/like-button.tsx
features/post/ui/delete-post-dialog.tsx
features/comment/ui/comment-input.tsx

// Widgets (composite)
widgets/post/ui/post-detail-view.tsx
widgets/header/ui/app-header.tsx
```

**Component Type Suffixes:**
- `-button`: Interactive buttons (`like-button.tsx`, `share-button.tsx`)
- `-dialog`: Dialog/Modal components (`delete-post-dialog.tsx`)
- `-form`: Form components (`post-edit-form.tsx`)
- `-input`: Input components (`comment-input.tsx`)
- `-card`: Card-style containers (`user-profile-card.tsx`)
- `-menu`: Menu/Dropdown components (`post-options-menu.tsx`)
- `-list`: List components (`comment-list.tsx`)
- `-item`: Individual list items (`comment-item.tsx`)
- `-view`: Full view/page components (`post-detail-view.tsx`)
- `-bar`: Action/Tool bars (`post-action-bar.tsx`)
- `-section`: Logical sections (`emotion-section.tsx`)

#### Utilities & Helpers (`.ts`)
- **Format**: `[purpose]-[type].ts`
- **kebab-case**

```typescript
shared/utils/format-date.ts
shared/utils/cn.ts
entities/post/lib/post-service.ts
shared/helpers/validation-helpers.ts
```

#### Hooks (`.ts`, `.tsx`)
- **Format**: `use-[purpose].ts`
- **kebab-case with `use-` prefix**

```typescript
shared/hooks/use-media-query.ts
features/post/hooks/use-post-form.ts
entities/auth/hooks/use-session.ts
```

#### Types & Models (`.ts`)
- **kebab-case for files**
- **PascalCase for interface/type names inside**

```typescript
// File: entities/post/model/types.ts
export interface IPost { ... }
export type PostType = "JOURNAL" | "ARTICLE"

// File: shared/types/enums.ts
export enum Access { ... }
```

#### API & Services (`.ts`)
- **kebab-case**

```typescript
entities/post/api/queries.ts
entities/post/api/mutates.ts
entities/post/api/dtos.ts
entities/post/lib/post-service.ts
```

#### Constants (`.ts`)
- **kebab-case for files**
- **SCREAMING_SNAKE_CASE for values**

```typescript
// File: shared/routes/constants.ts
export const ROUTES = {
  POST: {
    VIEW: (id: number) => `/post/${id}`,
  }
}

// File: entities/post/model/constants.ts
export const POST_TYPES = {
  JOURNAL: "JOURNAL",
  ARTICLE: "ARTICLE",
} as const
```

### Component Naming Pattern by Layer

#### Entities Layer (Data Display)
Focus on **what** is being displayed:

```
post-header-info.tsx      # Post header information
post-content.tsx          # Post content/body
post-author-card.tsx      # Author information card
user-avatar.tsx           # User avatar display
post-metrics.tsx          # Post statistics (read-only)
```

#### Features Layer (User Actions)
Focus on **actions** user can take:

```
like-button.tsx           # Like/unlike action
share-button.tsx          # Share action
delete-post-dialog.tsx    # Delete dialog
comment-input.tsx         # Comment input
follow-button.tsx         # Follow/unfollow action
post-options-menu.tsx     # Post options dropdown
access-type-selector.tsx  # Access type selection
```

#### Widgets Layer (Composite)
Focus on **complete sections/views**:

```
post-detail-view.tsx      # Complete post detail page
post-detail-header.tsx    # Header section with actions
post-detail-sidebar.tsx   # Sidebar with actions
post-comment-section.tsx  # Comment section
app-header.tsx            # Application header
app-sidebar.tsx           # Application sidebar
```

### Export Naming

Export component/function names in **PascalCase** (for components) or **camelCase** (for functions):

```typescript
// File: post-detail-view.tsx
export function PostDetailView() { ... }

// File: format-date.ts
export function formatDate() { ... }

// File: use-post-form.ts
export function usePostForm() { ... }
```

### Index Files

Use `index.ts` to re-export public APIs:

```typescript
// entities/post/index.ts
export type { IPost, ICreatePost } from "./api/dtos"
export { postQueries } from "./api/queries"

// features/post/index.ts
export { LikeButton } from "./ui/like-button"
export { DeletePostDialog } from "./ui/delete-post-dialog"

// widgets/post/index.ts
export { PostDetailView } from "./ui/post-detail-view"
```

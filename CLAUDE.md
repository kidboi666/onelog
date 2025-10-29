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

## File Naming

- Components: PascalCase (`PostCard.tsx`)
- Utilities: camelCase (`format-date.ts`)
- Types: PascalCase interfaces (`IPost`, `IUser`)
- Hooks: camelCase with `use` prefix (`usePostForm.ts`)
- Constants: SCREAMING_SNAKE_CASE (`ROUTES`, `POST_TYPES`)

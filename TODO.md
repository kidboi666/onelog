# shadcn/ui 마이그레이션 작업 상태 보고서

> 프로젝트의 커스텀 컴포넌트를 shadcn/ui로 마이그레이션하고 FSD 아키텍처로 구조 재정비

---

## 📁 프로젝트 구조 변경사항 (2025-10-28)

### 현재 디렉토리 구조

```
one_log/
├── app/                          # Next.js App Router (루트로 이동)
│   ├── (playground)/             # 레이아웃 그룹
│   │   ├── (home)/              # 홈 피드
│   │   ├── @header/             # 병렬 라우트: 헤더
│   │   ├── @sidebar/            # 병렬 라우트: 사이드바
│   │   ├── @modal/              # 병렬 라우트: 모달
│   │   ├── modal/               # 일반 모달 라우트
│   │   ├── post/                # 포스트 페이지
│   │   ├── profile/             # 프로필 페이지
│   │   ├── settings/            # 설정 페이지
│   │   └── todo/                # Todo 페이지
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
└── src/                          # FSD (Feature-Sliced Design) 아키텍처
    ├── app/                      # ✨ core → app 리네이밍
    │   ├── middlewares/          # 미들웨어 (auth-guard, x-pathname)
    │   ├── providers/            # Context Providers
    │   ├── constants.ts             # 라우트 상수
    │   └── store/                # Zustand 스토어
    │
    ├── entities/                 # 도메인 엔티티
    │   ├── auth/
    │   ├── comment/
    │   ├── follow/
    │   ├── garden/
    │   ├── like/
    │   ├── post/
    │   ├── user/
    │   └── word/
    │
    ├── features/                 # 기능 모듈
    │
    ├── shared/                   # 공유 리소스
    │   ├── components/
    │   │   └── ui/              # shadcn/ui 컴포넌트
    │   ├── lib/                  # 라이브러리 래퍼
    │   ├── types/                # 공통 타입
    │   └── utils/                # 유틸리티 함수
    │
    ├── widgets/                  # 복합 UI 블록
    │
    └── proxy.ts
```

### 주요 변경사항

1. **`/app` 폴더를 루트로 이동**
   - 기존: `/src/app/(playground)/...`
   - 현재: `/app/(playground)/...`
   - Next.js 13+ App Router 컨벤션에 맞춤

2. **`/src/core` → `/src/app` 리네이밍**
   - FSD 아키텍처의 표준 레이어명 사용
   - 내용물: routes, store, providers, middlewares

3. **Import 경로 표준화 필요**
   - 기존: `@/src/core/*`, `@/core/*`
   - 목표: `@/app/*` (일부 파일에서 아직 혼재)

---

## 📊 shadcn/ui 마이그레이션 진행 상황

### ✅ 완료 (9/10 페이지 영역)

#### 1. 레이아웃 컴포넌트
- ✅ **Sidebar** (`app/@sidebar/default.tsx`)
  - shadcn: Button, Tooltip, Avatar, Separator
  - Lucide React 아이콘
  - Stack → div + flex 변환

- ✅ **Header** (`app/@header/default.tsx`)
  - shadcn: Sheet (모바일 메뉴), Button
  - 테마 토글 버튼
  - 반응형 디자인

#### 2. 홈 피드 페이지 (100% 완료)
- ✅ **FakeFormContainer** - Card, Avatar
- ✅ **PostContainer** - 무한 스크롤
- ✅ **PostCard** - Card, useTransition
- ✅ **PostHeader** - Avatar, Badge, date-fns
- ✅ **PostCardContent** - Card, Badge, Tiptap
- ✅ **액션 버튼들**
  - LikeButton - Button, Tooltip, Heart 아이콘
  - CommentButton - Button, Tooltip
  - AccessTypeButtonWithDropDown - Popover
  - ReportButton - Button, Tooltip
- ✅ **Comments 영역**
  - CommentInput - Input, Button, Avatar
  - CommentItem - Avatar, date-fns
  - CommentModifyInput - Input, Button
  - Comments - 전체 컨테이너

#### 3. 모달 시스템 (100% 완료)
- ✅ **Modal 컴포넌트** (`src/shared/components/Modal.tsx`)
  - shadcn Dialog로 완전 재구현
  - Next.js intercepting routes 호환

- ✅ **인증 모달**
  - signin - DialogHeader, Input, Label
  - signup - Form validation with Zod
  - auth_guard - 로그인 안내

- ✅ **삭제 확인 모달**
  - delete_comment - DialogFooter
  - delete_post - useDeletePost mutation 추가

- ✅ **팔로우 모달**
  - follower/[userId] - useSuspenseQuery
  - following/[userId] - FollowUserCard
  - FollowUserCard 컴포넌트 - Avatar, Button

- ✅ **기타 모달**
  - success - 작업 완료 안내

#### 4. 프로필 뷰 페이지 (100% 완료)
- ✅ **ProfileHeader** - shadcn Avatar, h1, span
- ✅ **EmotionAverage** - 감정 평균 배지 표시
- ✅ **ProfileAboutMe** - 자기소개 섹션
- ✅ **LockContent** - 비공개 게시물 안내
- ✅ **RenderActionButtonFromProfile** - 프로필 수정/팔로우 버튼
- ✅ **RenderFollowButtonFromProfile** - 팔로워/팔로잉 통계
- ✅ **AuthHistory** - 사용자 통계 (가입일, 게시물 수, 평균 감정)
- ✅ **MyFavoriteWords** - 자주 사용하는 단어
- ✅ **HistoryBlock** - 통계 블록 컴포넌트

#### 5. Import 경로 정리 (100% 완료)
- ✅ **Sidebar 컴포넌트**
  - GuestContent, LoggedInContent
  - AuthButtonWithDropDown, MenuButton
  - OpenButton, SidebarWriteButtonWithLogo
  - BookMark, SelectedMenuBackground
- ✅ **Header 컴포넌트**
  - MobileWriteButtonWithLogo

#### 6. 프로필 편집 페이지 (100% 완료)
- ✅ **ProfileForm** - shadcn Button, Loader2, 폼 검증
- ✅ **ProfileImageSection** - shadcn Avatar, Pencil 아이콘, toast
- ✅ **EmailSection** - shadcn Input (disabled), Label
- ✅ **UserNameSection** - shadcn Input, Label, 문자 수 카운터
- ✅ **AboutMeSection** - shadcn Textarea, Label, 문자 수 카운터
- ✅ **MBTISection** - shadcn Select (커스텀 DropDown 대체)
- ✅ **PasswordResetForm** - shadcn Button, Label

#### 7. 설정 페이지 (100% 완료)
- ✅ **LogoutButton** - shadcn Button, Label
- ✅ **DarkModeSwitch** - next-themes useTheme, Check 아이콘
- ✅ **ColorPicker** - useState 로컬 상태, Check 아이콘
- ✅ **page.tsx** - YStack → div + flex

---

### 🔄 진행 필요 (1/10 페이지 영역)

#### 8. 포스트 페이지
- [ ] **포스트 상세** (`app/post/view/@post/[postId]/`)
  - PostBody - Card
  - PostActionBar - Button 그룹
  - RenderCommentFromPost - 댓글 표시

- [ ] **포스트 편집** (`app/post/edit/`)
  - PostForm - Tiptap 에디터 유지
  - EmotionPickerWithDropDown - Popover
  - PublishSection - Button, Switch
  - BubbleMenuBar - Tooltip

#### 9. 저널 가든 (선택)
- [ ] **저널 가든**
  - 커스텀 시각화 - 유지 검토 필요
  - ColorInfoDisplay
  - GardenBlockSection

#### 10. Todo 페이지 (⚠️ 스킵 - 사용자 요청)
- ⏭️ Todo 관련 파일은 현재 상태 유지
- ⏭️ 추후 필요시 별도 작업

---

## 📝 커밋 이력

### Phase 1: 초기 마이그레이션
1. **`fd08323`** - shadcn/ui 컴포넌트로 마이그레이션 시작
   - 232 files, 11,837 insertions
   - Sidebar, Header, FakeFormContainer
   - IUserInfo 타입 수정 (userId→id, username→userName)

2. **`c8aba84`** - PostCard 및 액션 버튼들 마이그레이션
   - 7 files, 342 insertions, 281 deletions
   - PostCard, PostHeader, PostCardContent
   - LikeButton, CommentButton, AccessType, Report

3. **`fa594a6`** - TODO.md 파일 생성 및 .gitignore 추가
   - 1 file

### Phase 2: Comments & Modal
4. **`235c5b3`** - Comments 영역 마이그레이션
   - 4 files, 178 insertions, 153 deletions
   - CommentInput, CommentItem, CommentModifyInput, Comments
   - date-fns 통합

5. **`aa37102`** - Modal 컴포넌트 shadcn Dialog로 마이그레이션
   - 10 files, 347 insertions, 312 deletions
   - Modal 재구현, Auth Guard, 삭제 모달들
   - Follower/Following 모달
   - Post 삭제 mutation 추가

6. **`16599f1`** - 로그인/회원가입 모달 마이그레이션
   - 3 files, 182 insertions, 212 deletions
   - AuthForm 재구현
   - Zod 스키마 인라인화

### Phase 3: Import 경로 & 프로필
7. **`5e2a194`** - 완료된 영역 import 경로 정리 및 커스텀 컴포넌트 마이그레이션
   - 214 files, 7,529 insertions, 7,529 deletions
   - Sidebar 컴포넌트 8개: GuestContent, LoggedInContent, AuthButtonWithDropDown 등
   - Header 컴포넌트 1개: MobileWriteButtonWithLogo
   - 모든 import 경로 FSD 패턴으로 통일
   - Stack, Icon, DropDown, TextDisplay 등 커스텀 컴포넌트 제거

8. **`685e337`** - 프로필 뷰 컴포넌트 shadcn/ui로 마이그레이션
   - 10 files, 297 insertions, 210 deletions
   - ProfileHeader, EmotionAverage, ProfileAboutMe, LockContent
   - RenderActionButtonFromProfile, RenderFollowButtonFromProfile
   - AuthHistory, MyFavoriteWords, HistoryBlock
   - postCountQuery.countUserPosts 추가
   - 모든 컴포넌트 엔티티 계층 쿼리 사용

9. **`2901fe2`** - 프로필 편집 페이지 shadcn/ui로 마이그레이션
   - 8 files, 204 insertions, 228 deletions
   - ProfileForm, ProfileImageSection, EmailSection
   - UserNameSection, AboutMeSection, MBTISection
   - PasswordResetForm
   - 커스텀 DropDown → shadcn Select
   - 커스텀 Toast → sonner
   - maxLength로 입력 길이 제한

10. **`f4be4ff`** - 설정 페이지 shadcn/ui로 마이그레이션 및 코드 정리
   - 17 files, 163 insertions, 156 deletions
   - LogoutButton, DarkModeSwitch, ColorPicker
   - 커스텀 useTheme → next-themes
   - 엔티티 쿼리 이름 정리 (postQuery → postQueries)
   - ReactQueryProvider → query-provider.tsx

---

## 🎯 남은 작업

### 1순위: 포스트 페이지 마이그레이션
```
app/post/
├── view/
│   ├── @post/[postId]/
│   └── @side_menu/[postId]/
└── edit/
    └── page.tsx
```


### 최종: 정리 작업
- [x] Import 경로 일괄 변경 (완료된 영역)
  - `@/src/core/*` → `@/app/*`
  - `@/core/*` → `@/app/*`
  - `@/src/services/*` → `@/entities/*/api/*`
- [ ] 사용하지 않는 커스텀 컴포넌트 제거
  - `src/components/` 폴더 검토
  - Button, Input, Modal 등 중복 제거
- [ ] 타입 오류 최종 점검
- [ ] 프로덕션 빌드 테스트

---

## 🔧 기술 스택

### 사용 중
- **UI**: shadcn/ui (Radix UI 기반)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4 (CSS Variables)
- **Date**: date-fns (Korean locale)
- **Editor**: Tiptap
- **Forms**: React Hook Form + Zod
- **State**: Zustand, TanStack Query
- **Framework**: Next.js 14 App Router

### 제거 예정
- ❌ 커스텀 Stack 컴포넌트 (XStack, YStack, ZStack)
- ❌ 커스텀 Button, Input, Dropdown
- ❌ 커스텀 Modal (완료)
- ❌ 커스텀 훅 (useInput, useDataDrivenAnimation)

---

## 📌 주요 패턴 & 컨벤션

### 1. Component Migration Pattern
```typescript
// Before (Custom)
<YStack gap={4}>
  <Button isLoading={loading}>Submit</Button>
</YStack>

// After (shadcn)
<div className="flex flex-col gap-4">
  <Button disabled={isPending}>
    {isPending ? <Loader2 className="size-4 animate-spin" /> : "Submit"}
  </Button>
</div>
```

### 2. Modal Pattern
```typescript
// Modal wrapper with Dialog
<Modal>
  <DialogHeader>
    <DialogTitle>Title</DialogTitle>
    <DialogDescription>Description</DialogDescription>
  </DialogHeader>
  {/* Content */}
  <DialogFooter className="flex-row gap-2">
    <Button variant="secondary">Cancel</Button>
    <Button>Confirm</Button>
  </DialogFooter>
</Modal>
```

### 3. Entity API Pattern
```typescript
// Service layer
export const deletePost = async (postId: number, supabase?) => {
  return postApi.deletePost(postId, supabase);
};

// Mutation hook
export const useDeletePost = () => {
  return useMutation({
    mutationFn: (postId: number) => postService.deletePost(postId),
    onSuccess: () => { /* invalidate queries */ },
  });
};
```

### 4. Import Path Convention
```typescript
// App layer (routes, store, providers)
import { Constants } from "@/app/routes";
import { useMe } from "@/app/store/use-me";

// Entity layer
import { useDeletePost } from "@/entities/post/api/mutates";
import type { IPost } from "@/entities/post/model/types";

// Shared layer
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/tw-merge";
```

---

## ⚠️ 알려진 이슈 & 스킵 항목

### 스킵된 기능
1. **Kakao OAuth**: entities에 구현 없음 → 로그인/회원가입 모달에서 제거
2. **Report 모달**: report entity 미구현 → 버튼만 유지
3. **Todo 모달들**: 사용자 요청으로 스킵 (add_todo_folder, edit_todo_folder, delete_todo 등)

### Import 경로 혼재
- 일부 파일에서 `@/src/core/*`, `@/core/*`, `@/app/*` 혼용
- 전역 검색 후 일괄 변경 필요

---

## 📈 진행률 요약

| 영역 | 완료 | 진행 중 | 대기 | 완료율 |
|------|------|---------|------|--------|
| 레이아웃 | 2/2 | - | - | 100% |
| 홈 피드 | 1/1 | - | - | 100% |
| 모달 | 1/1 | - | - | 100% |
| Import 경로 | 1/1 | - | - | 100% |
| 프로필 뷰 | 1/1 | - | - | 100% |
| 프로필 편집 | 1/1 | - | - | 100% |
| 설정 | 1/1 | - | - | 100% |
| 포스트 | 0/2 | - | 2 | 0% |
| 저널 가든 | 0/1 | - | 1 | 0% (선택) |
| Todo | - | - | - | 스킵 |
| **전체** | **9/10** | **0** | **1** | **90%** |

---

**마지막 업데이트**: 2025-10-28
**프로젝트**: one_log (FSD 아키텍처)

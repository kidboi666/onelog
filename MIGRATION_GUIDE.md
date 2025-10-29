# Modal to Dialog Component Migration Guide

## 📋 Overview

모달 시스템을 라우팅 기반에서 컴포넌트 기반으로 전환했습니다.

**Before (라우팅 기반)**:
```tsx
router.push('/modal/delete_post/123')
```

**After (컴포넌트 기반)**:
```tsx
<DeletePostDialog postId={123}>
  <button>삭제</button>
</DeletePostDialog>
```

## 🎯 Benefits

- ✅ 단순한 구조 (라우팅 없이 DialogTrigger 사용)
- ✅ 타입 안전성 향상 (prop으로 데이터 전달)
- ✅ 더 나은 UX (페이지 이동 없음)
- ✅ 재사용성 증가

## 📦 Available Dialog Components

### Auth Dialogs
```tsx
import { SignInDialog, SignUpDialog, AuthGuardDialog } from '@/features/auth/ui'
```

### Post Dialogs
```tsx
import { DeletePostDialog } from '@/features/post/ui'
```

### Comment Dialogs
```tsx
import { DeleteCommentDialog } from '@/features/comment/ui'
```

### Follow Dialogs
```tsx
import { FollowerListDialog, FollowingListDialog } from '@/features/follow/ui'
```

### Shared Dialogs
```tsx
import { SuccessDialog } from '@/shared/components/ui/SuccessDialog'
```

## 🔄 Migration Examples

### 1. SignIn / SignUp Dialog

**Before**:
```tsx
<button onClick={() => router.push('/modal/signin')}>
  로그인
</button>
```

**After**:
```tsx
import { SignInDialog } from '@/features/auth/ui'

<SignInDialog onSwitchToSignUp={() => setShowSignUp(true)}>
  <button>로그인</button>
</SignInDialog>
```

### 2. Delete Post Dialog

**Before**:
```tsx
<button onClick={() => router.push(`/modal/delete_post/${postId}`)}>
  삭제
</button>
```

**After**:
```tsx
import { DeletePostDialog } from '@/features/post/ui'

<DeletePostDialog
  postId={postId}
  onSuccess={() => router.push(ROUTES.HOME)}
>
  <button>삭제</button>
</DeletePostDialog>
```

### 3. Delete Comment Dialog

**Before**:
```tsx
<button onClick={() =>
  router.push(`/modal/delete_comment/${commentId}?post_id=${postId}`)
}>
  댓글 삭제
</button>
```

**After**:
```tsx
import { DeleteCommentDialog } from '@/features/comment/ui'

<DeleteCommentDialog
  commentId={commentId}
  postId={postId}
  onSuccess={() => console.log('Deleted')}
>
  <button>댓글 삭제</button>
</DeleteCommentDialog>
```

### 4. Follower / Following List

**Before**:
```tsx
<button onClick={() => router.push(`/modal/follower/${userId}`)}>
  팔로워 목록
</button>
```

**After**:
```tsx
import { FollowerListDialog } from '@/features/follow/ui'

<FollowerListDialog
  userId={userId}
  onUserClick={(userId) => router.push(ROUTES.PROFILE.VIEW(userId))}
  onAuthRequired={() => setShowAuthGuard(true)}
>
  <button>팔로워 목록</button>
</FollowerListDialog>
```

### 5. Auth Guard Dialog (Programmatic)

**Before**:
```tsx
if (!me) {
  router.push('/modal/auth_guard')
}
```

**After**:
```tsx
import { AuthGuardDialog } from '@/features/auth/ui'
import { useState } from 'react'

const [showAuthGuard, setShowAuthGuard] = useState(false)

if (!me) {
  setShowAuthGuard(true)
}

<AuthGuardDialog
  open={showAuthGuard}
  onOpenChange={setShowAuthGuard}
  onSignInClick={() => {
    setShowAuthGuard(false)
    setShowSignIn(true)
  }}
/>
```

### 6. Success Dialog

**Before**:
```tsx
mutate(data, {
  onSuccess: () => router.push('/modal/success')
})
```

**After**:
```tsx
import { SuccessDialog } from '@/shared/components/ui/SuccessDialog'
import { useState } from 'react'

const [showSuccess, setShowSuccess] = useState(false)

mutate(data, {
  onSuccess: () => setShowSuccess(true)
})

<SuccessDialog
  open={showSuccess}
  onOpenChange={setShowSuccess}
  title="완료"
  description="요청이 성공적으로 완료되었습니다."
/>
```

## 📝 Files That Need Migration

아래 파일들에서 `ROUTES.MODAL` 사용을 Dialog 컴포넌트로 교체해야 합니다:

### High Priority (User Actions)
- [ ] `/src/app/(playground)/(home)/_components/OptionButtonWithDropDown.tsx`
  - DELETE comment → `DeleteCommentDialog`
  - DELETE post → `DeletePostDialog`

- [ ] `/src/app/(playground)/(home)/_components/CommentInput.tsx`
  - AUTH guard → `AuthGuardDialog`

- [ ] `/src/app/(playground)/(home)/_components/LikeButton.tsx`
  - AUTH guard → `AuthGuardDialog`

- [ ] `/src/app/(playground)/(home)/_components/FakeFormContainer.tsx`
  - AUTH guard → `AuthGuardDialog`

- [ ] `/src/app/(playground)/(home)/_components/ReportButton.tsx`
  - REPORT comment/post → TODO: Create ReportDialog components

### Medium Priority (Navigation)
- [ ] `/src/widgets/sidebar/ui/sidebar.tsx`
  - SIGN_IN → `SignInDialog`

- [ ] `/src/widgets/header/model/menu-items.ts`
  - SIGN_IN / SIGN_UP → Update to use Dialog components

- [ ] `/src/app/(playground)/profile/[userId]/_components/RenderFollowButtonFromProfile.tsx`
  - FOLLOWER/FOLLOWING → `FollowerListDialog` / `FollowingListDialog`

### Low Priority (Mutations)
- [ ] `/src/entities/auth/api/mutates.ts`
  - SUCCESS → `SuccessDialog`

- [ ] `/src/app/(playground)/post/edit/_hooks/usePostSubmit.ts`
  - SUCCESS → `SuccessDialog`

- [ ] `/src/app/(playground)/profile/edit/_components/PasswordResetForm.tsx`
  - UPDATE_PASSWORD → TODO: Create UpdatePasswordDialog

- [ ] `/src/hooks/mutates/useLikeMutates.ts`
  - AUTH guard → `AuthGuardDialog`

- [ ] `/src/hooks/mutates/useFollowMutates.ts`
  - FOLLOWER/FOLLOWING → `FollowerListDialog` / `FollowingListDialog`
  - AUTH guard → `AuthGuardDialog`

## ⚠️ Important Notes

1. **ROUTES.MODAL is deprecated**: 모든 modal routes는 `/`로 리다이렉트됩니다.

2. **No routing needed**: Dialog 컴포넌트는 페이지 이동 없이 작동합니다.

3. **State management**: `useState`로 Dialog open/close 상태를 관리하세요.

4. **Callbacks**: `onSuccess`, `onUserClick` 등의 콜백으로 액션을 처리하세요.

5. **TODO Dialogs**: Report, UpdatePassword, SendMessage 등의 Dialog는 아직 생성되지 않았습니다.

## 🚀 Next Steps

1. High Priority 파일부터 마이그레이션 시작
2. TODO Dialog 컴포넌트 생성 (Report, UpdatePassword 등)
3. `ROUTES.MODAL` 완전히 제거
4. Auth guard middleware 개선

## 📚 Resources

- Dialog Components: `/src/features/[domain]/ui/`
- shadcn/ui Dialog: `https://ui.shadcn.com/docs/components/dialog`
- CLAUDE.md: 프로젝트 아키텍처 참고

'use client'

import useFollowMutates from '@/src/hooks/mutates/useFollowMutates'
import useFollowValidate from '@/src/hooks/queries/useFollowValidate'
import useTransitionWithRoute from '@/src/hooks/useRouterPushWithTransition'
import { ROUTES } from '@/src/routes'
import Button from '@/src/components/Button'
import { XStack } from '@/src/components/Stack'

interface Props {
  meId?: string | null
  userId: string
}

export default function RenderActionButtonFromAuthorInfo({
  meId,
  userId,
}: Props) {
  const { isFollowing } = useFollowValidate(userId, meId)
  const { onFollow, isPending } = useFollowMutates({
    isFollowing,
    userId,
  })

  const [isLoadingWrite, startTransitionWrite] = useTransitionWithRoute(
    ROUTES.POST.NEW,
  )
  const [isLoadingEditProfile, startTransitionEditProfile] =
    useTransitionWithRoute(ROUTES.PROFILE.EDIT)

  return (
    <XStack
      onClick={(e) => e.stopPropagation()}
      className="flex-col justify-center"
    >
      {meId === userId ? (
        <>
          <Button
            size="sm"
            isLoading={isLoadingWrite}
            onClick={startTransitionWrite}
            className="w-full self-end"
          >
            글 쓰기
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={startTransitionEditProfile}
            isLoading={isLoadingEditProfile}
            className="w-full self-end"
          >
            프로필 수정
          </Button>
        </>
      ) : (
        <>
          <Button
            size="sm"
            isLoading={isPending}
            onClick={onFollow}
            className="w-full self-end"
          >
            {isFollowing ? '팔로우 취소' : '팔로우 하기'}
          </Button>
          <Button variant="secondary" size="sm" className="w-full self-end">
            메세지 보내기
          </Button>
        </>
      )}
    </XStack>
  )
}

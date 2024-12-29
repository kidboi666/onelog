'use client'

import { ROUTES } from '@/src/ROUTES'
import { IUserSession } from '@/src/types/auth'
import useFollowMutates from '@/src/hooks/mutates/useFollowMutates'
import useTransitionWithRoute from '@/src/hooks/useRouterPushWithTransition'
import Button from '@/src/components/Button'
import { XStack } from '@/src/components/Stack'

interface Props {
  session: IUserSession
  isFollowing: boolean
  userId: string
}

export default function RenderActionButtonFromAuthorInfo({ session, isFollowing, userId }: Props) {
  const { onFollow, isPending } = useFollowMutates({
    isFollowing,
    userId,
  })

  const [isLoadingWrite, startTransitionWrite] = useTransitionWithRoute(ROUTES.post.new)
  const [isLoadingEditProfile, startTransitionEditProfile] = useTransitionWithRoute(
    ROUTES.profile.edit,
  )

  return (
    <XStack onClick={(e) => e.stopPropagation()} className="flex-col justify-center">
      {session?.userId === userId ? (
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
          <Button size="sm" isLoading={isPending} onClick={onFollow} className="w-full self-end">
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

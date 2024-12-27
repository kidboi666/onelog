'use client'

import Button from '@/src/components/Button'
import { routes } from '@/src/routes'
import { XStack } from '@/src/components/Stack'
import useFollowActions from '@/src/hooks/actions/useFollowActions'
import { IUserInfoWithMBTI } from '@/src/types/auth'
import useTransitionWithRoute from '@/src/hooks/useRouterPushWithTransition'

interface Props {
  me: IUserInfoWithMBTI
  isFollowing: boolean
  userId: string
}

export default function RenderActionButtonFromAuthorInfo({
  me,
  isFollowing,
  userId,
}: Props) {
  const { onFollow, isPending } = useFollowActions({
    me,
    isFollowing,
    userId,
  })

  const [isLoadingWrite, startTransitionWrite] = useTransitionWithRoute(
    routes.post.new,
  )
  const [isLoadingEditProfile, startTransitionEditProfile] =
    useTransitionWithRoute(routes.profile.edit)

  return (
    <XStack
      onClick={(e) => e.stopPropagation()}
      className="flex-col justify-center"
    >
      {me?.id === userId ? (
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

'use client'

import { useMe } from '@/src/store/hooks/useMe'
import useFollowMutates from '@/src/hooks/mutates/useFollowMutates'
import useFollowQueries from '@/src/hooks/queries/useFollowQueries'
import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'
import { ROUTES } from '@/src/routes'
import Button from '@/src/components/Button'
import { XStack } from '@/src/components/Stack'

interface Props {
  userId: string
}

export default function RenderActionButtonFromProfile({ userId }: Props) {
  const { me } = useMe()
  const { isFollowing } = useFollowQueries(userId)
  const { onFollow, isPending } = useFollowMutates({
    isFollowing,
    userId,
  })
  let isMyProfilePage: boolean = false

  if (me) {
    isMyProfilePage = me?.id === userId
  }

  const [isLoadingProfile, handlePushEditProfilePage] =
    useRouterPushWithTransition(ROUTES.PROFILE.EDIT)
  const [isLoadingWrite, handlePushNewPostPage] = useRouterPushWithTransition(
    ROUTES.POST.NEW,
  )

  const handleSendMessageButtonClick = () => {
    return null
    /**
     * TODO 추후 redis 같은 db로 기능 구현 @kidboi666
     */
  }

  return (
    <XStack gap={4}>
      {isMyProfilePage ? (
        <>
          <Button
            variant="secondary"
            size="sm"
            isLoading={isLoadingProfile}
            onClick={handlePushEditProfilePage}
            className="text-nowrap"
          >
            프로필 수정
          </Button>
          <Button
            size="sm"
            isLoading={isLoadingWrite}
            onClick={handlePushNewPostPage}
          >
            글쓰기
          </Button>
        </>
      ) : (
        <>
          <Button
            variant={isFollowing ? 'secondary' : 'primary'}
            size="sm"
            isLoading={isPending}
            onClick={onFollow}
          >
            {isFollowing ? '팔로우 취소' : '팔로우 하기'}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleSendMessageButtonClick}
          >
            메시지 보내기
          </Button>
        </>
      )}
    </XStack>
  )
}

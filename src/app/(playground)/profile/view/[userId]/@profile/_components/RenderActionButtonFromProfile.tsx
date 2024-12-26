'use client'

import Button from '@/src/components/shared/Button'
import { XStack } from '@/src/components/shared/Stack'
import useFollowActions from '@/src/hooks/actions/useFollowActions'
import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'
import { routes } from '@/src/routes'
import useMe from '@/src/hooks/useMe'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userQuery } from '@/src/services/queries/auth/user-query'
import { supabase } from '@/src/lib/supabase/client'
import useFollowQuery from '@/src/hooks/query/useFollowQuery'

interface Props {
  userId: string
}

export default function RenderActionButtonFromProfile({ userId }: Props) {
  const { me } = useMe()
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const { isFollowing } = useFollowQuery({ meId: me.id, userId })
  const { onFollow, isPendingFollowActions } = useFollowActions({
    isFollowing,
    me,
    userId,
  })

  const isMyProfilePage = me?.id === user?.id

  const [isLoadingProfile, handlePushEditProfilePage] =
    useRouterPushWithTransition(routes.profile.edit)
  const [isLoadingWrite, handlePushNewPostPage] = useRouterPushWithTransition(
    routes.post.new,
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
            isLoading={isPendingFollowActions}
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

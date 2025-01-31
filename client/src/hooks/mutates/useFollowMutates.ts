'use client'

import { useRouter } from 'next/navigation'
import { useMe } from '@/src/store/hooks/useMe'
import useHandleFollow from '@/src/services/mutates/follow/useHandleFollow'
import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'
import { ROUTES } from '@/src/routes'

interface Props {
  isFollowing: boolean
  userId: string
}

export default function useFollowMutates({ isFollowing, userId }: Props) {
  const router = useRouter()
  const [isLoadingFollowerRoute, pushFollowerList] =
    useRouterPushWithTransition(ROUTES.MODAL.FOLLOW.FOLLOWER(userId))
  const [isLoadingFollowingRoute, pushFollowingList] =
    useRouterPushWithTransition(ROUTES.MODAL.FOLLOW.FOLLOWING(userId))
  const { me } = useMe()
  const { mutate: followOrUnfollow, isPending } = useHandleFollow()

  const authGuard = () =>
    router.push(ROUTES.MODAL.AUTH.GUARD, { scroll: false })

  const handleFollow = (options?: any) => {
    me
      ? followOrUnfollow(
          {
            followedUserId: userId,
            followerUserId: me.id,
            isFollowing,
          },
          { ...options },
        )
      : authGuard()
  }

  return {
    onFollow: handleFollow,
    pushFollowerList,
    pushFollowingList,
    isLoadingFollowerRoute,
    isLoadingFollowingRoute,
    isPending,
  }
}

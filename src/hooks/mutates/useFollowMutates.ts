'use client'

import useHandleFollow from '@/src/services/mutates/follow/useHandleFollow'
import { routes } from '@/src/routes'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'
import useRouterPush from '@/src/hooks/useRouterPush'

interface Props {
  isFollowing: boolean
  userId: string
}

export default function useFollowMutates({ isFollowing, userId }: Props) {
  const [isLoadingFollowerRoute, pushFollowerList] =
    useRouterPushWithTransition(routes.modal.follow.follower(userId))
  const [isLoadingFollowingRoute, pushFollowingList] =
    useRouterPushWithTransition(routes.modal.follow.following(userId))
  const authGuard = useRouterPush(routes.modal.auth.guard, false)
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: followOrUnfollow, isPending } = useHandleFollow()

  const handleFollow = (options?: any) => {
    me
      ? followOrUnfollow(
          {
            followed_user_id: userId,
            follower_user_id: me.userId,
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

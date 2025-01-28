'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import useHandleFollow from '@/src/services/mutates/follow/useHandleFollow'
import { meQuery } from '@/src/services/queries/auth/me-query'
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
  const { data: me } = useSuspenseQuery(meQuery.getSession(supabase))
  const { mutate: followOrUnfollow, isPending } = useHandleFollow()

  const authGuard = () =>
    router.push(ROUTES.MODAL.AUTH.GUARD, { scroll: false })

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

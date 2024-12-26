'use client'

import useFollow from '@/src/services/mutates/follow/useFollow'
import useUnFollow from '@/src/services/mutates/follow/useUnFollow'
import { routes } from '@/src/routes'
import { useRouter } from 'next/navigation'

interface Props {
  me: any
  isFollowing: boolean
  userId: string
}

export default function useFollowActions({ me, isFollowing, userId }: Props) {
  const router = useRouter()
  const { mutate: follow, isPending: isPendingFollow } = useFollow()
  const { mutate: unfollow, isPending: isPendingUnfollow } = useUnFollow()

  const handleFollow = () => {
    me
      ? isFollowing
        ? unfollow({
            followed_user_id: userId,
            follower_user_id: me.id,
          })
        : follow({
            followed_user_id: userId,
            follower_user_id: me.id,
          })
      : router.push(routes.modal.auth.guard, { scroll: false })
  }

  const pushFollowerList = () =>
    router.push(routes.modal.follow.follower(userId))

  const pushFollowingList = () =>
    router.push(routes.modal.follow.following(userId))

  return {
    follow,
    unfollow,
    onFollow: handleFollow,
    pushFollowerList,
    pushFollowingList,
    isPendingFollow,
    isPendingUnfollow,
  }
}

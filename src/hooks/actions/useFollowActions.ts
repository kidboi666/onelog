'use client'

import useHandleFollow from '@/src/services/mutates/follow/useHandleFollow'
import { routes } from '@/src/routes'
import { useRouter } from 'next/navigation'
import { IUserInfoWithMBTI } from '@/src/types/auth'

interface Props {
  me: IUserInfoWithMBTI
  isFollowing: boolean
  userId: string
}

export default function useFollowActions({ me, isFollowing, userId }: Props) {
  const router = useRouter()
  const { mutate: followOrUnfollow, isPending: isPendingFollowActions } =
    useHandleFollow()

  const handleFollow = (options?: any) => {
    me
      ? followOrUnfollow(
          {
            followed_user_id: userId,
            follower_user_id: me.id,
            isFollowing,
          },
          { ...options },
        )
      : router.push(routes.modal.auth.guard, { scroll: false })
  }

  const pushFollowerList = () =>
    router.push(routes.modal.follow.follower(userId))

  const pushFollowingList = () =>
    router.push(routes.modal.follow.following(userId))

  return {
    onFollow: handleFollow,
    pushFollowerList,
    pushFollowingList,
    isPendingFollowActions,
  }
}

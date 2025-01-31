'use client'

import { useRouter } from 'next/navigation'
import { MouseEvent, useState } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
import useHandleFollow from '@/src/services/mutates/follow/useHandleFollow'
import useFollowQueries from '@/src/hooks/queries/useFollowQueries'
import { ROUTES } from '@/src/routes'
import Modal from '@/src/components/Modal'
import { YStack } from '@/src/components/Stack'
import FollowUserCard from '../../_components/FollowUserCard'

interface Props {
  params: { userId: string }
}

export default function FollowingListModal({ params: { userId } }: Props) {
  const router = useRouter()
  const { me } = useMe()
  const { followings, myFollows } = useFollowQueries(userId)
  const { mutate: followOrUnfollow } = useHandleFollow()
  const [pendingList, setPendingList] = useState<Record<string, boolean>>({})

  const handleFollow = (
    e: MouseEvent,
    userId: string,
    isFollowing: boolean,
  ) => {
    e.stopPropagation()
    if (!me) return router.push(ROUTES.MODAL.AUTH.GUARD)

    setPendingList((prev) => ({ ...prev, [userId]: true }))
    followOrUnfollow(
      {
        followedUserId: userId,
        followerUserId: me!.id,
        isFollowing,
      },
      {
        onSettled: () => {
          setPendingList((prev) => ({ ...prev, [userId]: false }))
        },
      },
    )
  }

  const handlePushUserPage = (userId: string) => {
    router.push(ROUTES.PROFILE.VIEW(userId), { scroll: false })
  }

  return (
    <Modal>
      <YStack className="w-full">
        {followings?.map((user) => {
          const isFollowing = myFollows?.find(
            (myFollower: any) => myFollower.followedUserId === user.userInfo.id,
          )
          const isMe = me?.id === user.followedUserId
          const isPending = pendingList[user.userInfo.id] || false

          return (
            <FollowUserCard
              key={user.id}
              isFollowing={!!isFollowing}
              isMe={isMe}
              follower={user}
              onFollow={(e: MouseEvent) =>
                handleFollow(e, user.userInfo.id, !!isFollowing)
              }
              pushUserPage={() => handlePushUserPage(user.userInfo.id)}
              isPending={isPending}
            />
          )
        })}
      </YStack>
    </Modal>
  )
}

'use client'

import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import useMeQueries from '@/src/hooks/queries/useMeQueries'
import { routes } from '@/src/routes'
import Modal from '@/src/components/Modal'
import { YStack } from '@/src/components/Stack'
import FollowUserCard from '../../_components/FollowUserCard'
import useFollowQueries from '@/src/hooks/queries/useFollowQueries'
import useHandleFollow from '@/src/services/mutates/follow/useHandleFollow'

interface Props {
  params: { userId: string }
}

export default function FollowerListModal({ params }: Props) {
  const router = useRouter()
  const userId = params.userId
  const { me, session } = useMeQueries()
  const { followers, myFollows } = useFollowQueries(userId)
  const { mutate: followOrUnfollow } = useHandleFollow()
  const [pendingList, setPendingList] = useState<Record<string, boolean>>({})

  const handleFollow = (
    e: MouseEvent,
    userId: string,
    isFollowing: boolean,
  ) => {
    e.stopPropagation()
    if (!session) return router.push(routes.modal.auth.guard)

    setPendingList((prev) => ({ ...prev, [userId]: true }))
    followOrUnfollow(
      {
        followed_user_id: userId,
        follower_user_id: me.id,
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
    router.push(routes.profile.view(userId), { scroll: false })
  }

  return (
    <Modal>
      <YStack className="w-full">
        {followers?.map((follower) => {
          const isFollowing = myFollows?.find(
            (myFollower: any) =>
              myFollower.followed_user_id === follower.user_info.id,
          )
          const isMe = me?.id === follower.user_info.id
          const isPending = pendingList[follower.user_info.id] || false

          return (
            <FollowUserCard
              key={follower.id}
              isFollowing={!!isFollowing}
              isMe={isMe}
              follower={follower}
              onFollow={(e: MouseEvent) =>
                handleFollow(e, follower.user_info.id, !!isFollowing)
              }
              isPending={isPending}
              pushUserPage={() => handlePushUserPage(follower.user_info.id)}
            />
          )
        })}
      </YStack>
    </Modal>
  )
}

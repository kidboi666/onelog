'use client'

import Modal from '@/components/shared/Modal'
import { YStack } from '@/components/shared/Stack'
import { supabase } from '@/lib/supabase/client'
import useFollow from '@/services/mutates/follow/useFollow'
import useUnFollow from '@/services/mutates/follow/useUnFollow'
import { meQuery } from '@/services/queries/auth/meQuery'
import { followQuery } from '@/services/queries/follow/followQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import FollowUserCard from '../../_components/FollowUserCard'

interface Props {
  params: { userId: string }
}

export default function FollowerListModal({ params }: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, params.userId),
  )
  const { data: myFollows } = useSuspenseQuery(
    followQuery.getFollowing(supabase, me?.userId),
  )
  const { mutate: followUser } = useFollow()
  const { mutate: unfollowUser } = useUnFollow()
  const handleFollowUser = (userId: string) =>
    followUser({
      followed_user_id: userId,
      follower_user_id: me!.userId,
    })
  const handleUnfollowUser = (userId: string) =>
    unfollowUser({
      followed_user_id: userId,
      follower_user_id: me!.userId,
    })

  return (
    <Modal className="sm:max-w-[600px]">
      <YStack gap={8} className="w-full">
        {followers?.map((follower) => {
          const isFollowing = myFollows?.find(
            (user: any) => user.followed_user_id === follower.user_info.id,
          )
          const isMe = me?.userId === follower.user_info.id

          return (
            <FollowUserCard
              key={follower.id}
              isFollowing={isFollowing}
              isMe={isMe}
              follower={follower}
              follow={handleFollowUser}
              unfollow={handleUnfollowUser}
            />
          )
        })}
      </YStack>
    </Modal>
  )
}

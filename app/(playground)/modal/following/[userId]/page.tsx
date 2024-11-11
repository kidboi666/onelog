'use client'

import Modal from '@/components/shared/Modal'
import { YStack } from '@/components/shared/Stack'
import { supabase } from '@/lib/supabase/client'
import useFollow from '@/services/mutates/follow/useFollow'
import useUnFollow from '@/services/mutates/follow/useUnFollow'
import { followQuery } from '@/services/queries/follow/followQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import FollowUserCard from '../../_components/FollowUserCard'
import { useRouter } from 'next/navigation'
import useMe from '@/hooks/useMe'
import { useCallback } from 'react'

interface Props {
  params: { userId: string }
}

export default function FollowingListModal({ params }: Props) {
  const router = useRouter()
  const { me, session } = useMe()
  const { data: followings } = useSuspenseQuery(
    followQuery.getFollowing(supabase, params.userId),
  )
  const { data: myFollows } = useSuspenseQuery(
    followQuery.getFollowing(supabase, me?.id),
  )
  const { mutate: followUser } = useFollow()
  const { mutate: unfollowUser } = useUnFollow()

  const handleFollowUser = useCallback(
    (e: MouseEvent, userId: string) => {
      e.stopPropagation()
      if (!session) return router.push('/modal/auth_guard')
      followUser({
        followed_user_id: userId,
        follower_user_id: me!.id,
      })
    },
    [session, me, router, followUser],
  )

  const handleUnfollowUser = useCallback(
    (e: MouseEvent, userId: string) => {
      e.stopPropagation()
      if (!session) return router.push('/modal/auth_guard')
      unfollowUser({
        followed_user_id: userId,
        follower_user_id: me!.id,
      })
    },
    [session, me, router, unfollowUser],
  )

  const handlePushUserPage = useCallback(
    (userId: string) => {
      router.push(`/profile/${userId}`, { scroll: false })
    },
    [router],
  )

  return (
    <Modal className="sm:max-w-[600px]">
      <YStack className="w-full">
        {followings?.map((user) => {
          const isFollowing = myFollows?.find(
            (user: any) => user.followed_user_id === user.user_info.id,
          ) // 내가 팔로우중인 사람들 중, 해당 유저 아이디가 있으면 팔로우 취소 버튼을
          const isMe = me?.id === user.followed_user_id
          // 유저의 아이디가 내 아이디라면 팔로우 버튼 삭제

          return (
            <FollowUserCard
              key={user.id}
              isFollowing={isFollowing}
              isMe={isMe}
              follower={user}
              follow={(e: MouseEvent) => handleFollowUser(e, user.user_info.id)}
              unfollow={(e: MouseEvent) =>
                handleUnfollowUser(e, user.user_info.id)
              }
              pushUserPage={() => handlePushUserPage(user.user_info.id)}
            />
          )
        })}
      </YStack>
    </Modal>
  )
}

// 거씨발 팔로우 기능이 이렇게 복잡한거라니 개자식들 누가 누구를 팔로우를씨팔

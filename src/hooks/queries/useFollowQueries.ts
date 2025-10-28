'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useMe } from '@/src/store/hooks/useMe'
import { countFollowQuery } from '@/src/services/queries/follow/count-follow-query'
import { followQuery } from '@/src/services/queries/follow/follow-query'

export default function useFollowQueries(userId: string) {
  const { me } = useMe()
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(userId),
  )
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(userId),
  )
  const { data: followers } = useSuspenseQuery(followQuery.getFollower(userId))
  const { data: followings } = useSuspenseQuery(
    followQuery.getFollowing(userId),
  )
  const { data: myFollows } = useQuery(followQuery.getFollowing(me?.id ?? ''))

  let isFollowing = false
  let isMe = false

  if (me) {
    isFollowing = !!followers?.find((user) => user.followerUserId === me.id)
    isMe = me.id === userId
  }

  return {
    followerCount,
    followingCount,
    followers,
    followings,
    myFollows,
    isFollowing,
    isMe,
  }
}

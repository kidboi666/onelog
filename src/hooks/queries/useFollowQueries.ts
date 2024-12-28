'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { countFollowQuery } from '@/src/services/queries/follow/count-follow-query'
import { supabase } from '@/src/lib/supabase/client'
import { followQuery } from '@/src/services/queries/follow/follow-query'
import { meQuery } from '@/src/services/queries/auth/me-query'

interface Props {
  userId: string
}

export default function useFollowQueries({ userId }: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, userId),
  )
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, userId),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, userId),
  )
  const { data: followings } = useSuspenseQuery(
    followQuery.getFollowing(supabase, userId),
  )
  const { data: myFollows } = useSuspenseQuery(
    followQuery.getFollowing(supabase, me?.userId),
  )

  let isFollowing = false
  let isMe = false

  if (me) {
    isFollowing = followers?.find((user) => user.follower_user_id === me.userId)
    isMe = me.userId === userId
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

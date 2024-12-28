'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { countFollowQuery } from '@/src/services/queries/follow/count-follow-query'
import { supabase } from '@/src/lib/supabase/client'
import { followQuery } from '@/src/services/queries/follow/follow-query'
import { meQuery } from '@/src/services/queries/auth/me-query'

export default function useFollowQueries(userId: string) {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))

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
  const { data: myFollows } = useQuery(
    followQuery.getFollowing(supabase, session?.userId),
  )

  let isFollowing = false
  let isMe = false

  if (session) {
    isFollowing = followers?.find(
      (user) => user.follower_user_id === session.userId,
    )
    isMe = session.userId === userId
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

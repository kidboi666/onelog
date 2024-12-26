import { useSuspenseQuery } from '@tanstack/react-query'
import { countFollowQuery } from '@/src/services/queries/follow/count-follow-query'
import { supabase } from '@/src/lib/supabase/client'
import { followQuery } from '@/src/services/queries/follow/follow-query'

interface Props {
  userId: string
  meId: string
}

export default function useFollowQuery({ userId, meId }: Props) {
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, userId),
  )
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, userId),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, userId),
  )

  const isFollowing = followers?.find((user) => user.follower_user_id === meId)
  const isMe = meId === userId

  return { followerCount, followingCount, followers, isFollowing, isMe }
}

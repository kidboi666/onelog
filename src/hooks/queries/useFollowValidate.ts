import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { followQuery } from '@/src/services/queries/follow/follow-query'

export default function useFollowValidate(userId: string, meId?: string | null) {
  const { data: followers } = useSuspenseQuery(followQuery.getFollower(supabase, userId))
  const isFollowing = meId ? followers?.find((user) => user.follower_user_id === meId) : false

  return { isFollowing }
}

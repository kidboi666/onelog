import { createFollowAdapter } from '@/src/adapters/index'
import { QUERY_KEY } from '@/src/constants/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { TFollower } from '@/src/types/follow'

export const followQuery = {
  /** 유저를 팔로우하는 유저의 Id들 */
  getFollower: (supabase: SupabaseClient, userId: string) =>
    queryOptions<TFollower[]>({
      queryKey: QUERY_KEY.FOLLOW.FOLLOWER(userId),
      queryFn: () => createFollowAdapter(supabase).getFollowers(userId),
      enabled: !!userId,
    }),

  /** 유저가 팔로우하는 유저의 Id들 */
  getFollowing: (supabase: SupabaseClient, userId: string) =>
    queryOptions<TFollower[]>({
      queryKey: QUERY_KEY.FOLLOW.FOLLOWING(userId),
      queryFn: () => createFollowAdapter(supabase).getFollowings(userId),
      enabled: !!userId,
    }),
}

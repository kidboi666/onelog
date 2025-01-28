import { createFollowAdapter } from '@/src/adapters/index'
import { QUERY_KEY } from '@/src/constants/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const countFollowQuery = {
  /** 유저를 팔로우하는 유저의 Id들 */
  countFollower: (
    supabase: SupabaseClient,
    userId: string,
    isMount: boolean | undefined = false,
  ) =>
    queryOptions({
      queryKey: QUERY_KEY.FOLLOW.COUNT.FOLLOWER(userId),
      queryFn: () => createFollowAdapter(supabase).getFollowersCount(userId),
      enabled: isMount,
    }),

  /** 유저가 팔로우하는 유저의 Id들 */
  countFollowing: (
    supabase: SupabaseClient,
    userId: string,
    isMount: boolean | undefined = false,
  ) =>
    queryOptions({
      queryKey: QUERY_KEY.FOLLOW.COUNT.FOLLOWING(userId),
      queryFn: () => createFollowAdapter(supabase).getFollowingsCount(userId),
      enabled: isMount,
    }),
}

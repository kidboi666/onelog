import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const followQuery = {
  /** 유저를 팔로우하는 유저의 Id들 */
  getFollowers: (supabase: SupabaseClient, userId?: string) =>
    queryOptions({
      queryKey: ['follower', userId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('follow')
          .select('follower_user_id')
          .eq('followed_user_id', userId)

        if (error) {
          console.error('팔로워 목록 조회 실패:', error)
        }

        return data
      },
    }),

  /** 유저가 팔로우하는 유저의 Id들 */
  getFollwing: (supabase: SupabaseClient, userId?: string) =>
    queryOptions({
      queryKey: ['following', userId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('follow')
          .select('followed_user_id')
          .eq('follower_user_id', userId)

        if (error) {
          console.error('팔로잉 목록 조회 실패:', error)
        }

        return data
      },
    }),

  /** 유저를 팔로우하는 사람들 정보 */
  getMyFollowers: (supabase: SupabaseClient, userId?: string) =>
    queryOptions({
      queryKey: ['followers', userId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('follow')
          .select('followed_user_id')
          .eq('follower_user_id', userId)
      },
    }),
}

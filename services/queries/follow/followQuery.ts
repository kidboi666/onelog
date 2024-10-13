import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const followQuery = {
  /** 나를 따라오는 사람 */
  getFollowers: (supabase: SupabaseClient, userId: string) =>
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

  /** 내가 따라가는 사람 */
  getFollwing: (supabase: SupabaseClient, userId: string) =>
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
}

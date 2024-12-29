import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'

export const postCountQuery = {
  countLikedPost: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: QUERY_KEY.POST.COUNT.LIKED(userId),
      queryFn: async () => {
        const { count } = await supabase
          .from('like')
          .select('*', { COUNT: 'exact', head: true })
          .eq('user_id', userId)
        return count
      },
      enabled: !!userId,
    }),

  countAllMyPost: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: QUERY_KEY.POST.COUNT.TOTAL(userId),
      queryFn: async () => {
        const { count } = await supabase
          .from('post')
          .select('*', { COUNT: 'exact', head: true })
          .eq('user_id', userId)

        return count
      },
      enabled: !!userId,
    }),

  countAllPost: (supabase: SupabaseClient, userId: string, postType: 'journal' | 'article') =>
    queryOptions({
      queryKey: QUERY_KEY.POST.COUNT.POST_TYPE(userId, postType),
      queryFn: async () => {
        const { count } = await supabase
          .from('post')
          .select('*', { COUNT: 'exact', head: true })
          .eq('user_id', userId)
          .eq('post_type', postType)

        return { count, postType }
      },
      enabled: !!userId,
    }),
}

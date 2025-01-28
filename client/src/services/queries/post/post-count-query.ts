import { QUERY_KEY } from '@/src/constants/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { PostType } from '@/src/types/enums'

export const postCountQuery = {
  countLikedPost: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: QUERY_KEY.POST.COUNT.LIKED(userId),
      queryFn: async () => {
        const { count } = await supabase
          .from('like')
          .select('*', { count: 'exact', head: true })
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
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)

        return count
      },
      enabled: !!userId,
    }),

  countAllPost: (
    supabase: SupabaseClient,
    userId: string,
    postType: PostType,
  ) =>
    queryOptions({
      queryKey: QUERY_KEY.POST.COUNT.POST_TYPE(userId, postType),
      queryFn: async () => {
        const { count } = await supabase
          .from('post')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('post_type', postType)

        return { count, postType }
      },
      enabled: !!userId,
    }),
}

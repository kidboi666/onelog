import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { PostType } from '@/src/types/enums/index'

export const postCountQuery = {
  countLikedPost: (userId: string) =>
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

  countAllMyPost: (userId: string) =>
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

  countAllPost: (userId: string, postType: PostType) =>
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

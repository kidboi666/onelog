import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const countSentenceQuery = {
  countLikedSentence: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: ['sentence_count', 'liked', userId],
      queryFn: async () => {
        const { count } = await supabase
          .from('like')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
        return count
      },
      enabled: !!userId,
    }),

  countAllMySentence: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: ['sentence_count', userId],
      queryFn: async () => {
        const { count } = await supabase
          .from('sentence')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)

        return count
      },
      enabled: !!userId,
    }),

  countAllSentence: (
    supabase: SupabaseClient,
    userId: string,
    postType: 'journal' | 'article',
  ) =>
    queryOptions({
      queryKey: ['sentence_count', postType, userId],
      queryFn: async () => {
        const { count } = await supabase
          .from('sentence')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('post_type', postType)

        return { count, postType }
      },
      enabled: !!userId,
    }),
}

import { Tables } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const commentQuery = {
  getComment: (supabase: SupabaseClient, sentenceId: number) =>
    queryOptions<Tables<'comment'>[]>({
      queryKey: ['comment', sentenceId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('comment')
          .select()
          .eq('sentence_id', sentenceId)
          .is('comment_id', null)
          .order('created_at', { ascending: true })

        if (error) {
          throw error
        }

        return data
      },
      enabled: !!sentenceId,
    }),

  getCommentToComment: (
    supabase: SupabaseClient,
    sentenceId: number,
    commentId: number,
  ) =>
    queryOptions<Tables<'comment'>[]>({
      queryKey: ['comment', sentenceId, commentId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('comment')
          .select()
          .eq('comment_id', commentId)
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        return data
      },
      enabled: !!commentId,
    }),
}

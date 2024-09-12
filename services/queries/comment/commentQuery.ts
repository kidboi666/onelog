import { Tables } from '@/types/supabase'
import { queryOptions } from '@tanstack/react-query'

export const commentQuery = {
  getComment: (supabase: any, sentenceId: number) =>
    queryOptions<Tables<'comment'>[]>({
      queryKey: ['comment', sentenceId],
      queryFn: async () => {
        const { data } = await supabase
          .from('comment')
          .select()
          .eq('sentence_id', sentenceId)

        return data
      },
      enabled: !!sentenceId,
    }),

  getCommentToComment: (supabase: any, commentId: number) =>
    queryOptions<Tables<'comment'>[]>({
      queryKey: ['comment', commentId],
      queryFn: async () => {
        const { data } = await supabase
          .from('comment')
          .select()
          .eq('comment_id', commentId)

        return data
      },
      enabled: !!commentId,
    }),
}

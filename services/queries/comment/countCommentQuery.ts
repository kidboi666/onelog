import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const countCommentQuery = {
  countCommentFromSentence: (supabase: SupabaseClient, sentenceId?: number) =>
    queryOptions({
      queryKey: ['comment', 'count', sentenceId],
      queryFn: async () => {
        const { count } = await supabase
          .from('comment')
          .select('*', { count: 'exact', head: true })
          .eq('sentence_id', sentenceId)

        return count
      },
    }),
  countCommentFromComment: (
    supabase: SupabaseClient,
    sentenceId?: number,
    commentId?: number,
  ) =>
    queryOptions({
      queryKey: ['comment_to_comment', 'count', sentenceId, commentId],
      queryFn: async () => {
        const { count } = await supabase
          .from('comment')
          .select('*', { count: 'exact', head: true })
          .eq('sentence_id', sentenceId)
          .eq('comment_id', commentId)

        return count
      },
      enabled: !!commentId,
    }),
}

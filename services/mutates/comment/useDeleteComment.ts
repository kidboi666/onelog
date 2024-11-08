import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface IDeleteComment {
  sentenceId: number
  commentId: number
}

export default function useDeleteComment() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async ({ sentenceId, commentId }: IDeleteComment) => {
      return supabase
        .from('comment')
        .delete()
        .eq('sentence_id', sentenceId)
        .eq('id', commentId)
        .select()
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: ['all_sentence'] })
      queryClient.invalidateQueries({
        queryKey: ['all_sentence'],
      })
      queryClient.invalidateQueries({
        queryKey: ['sentence', variables.sentenceId],
      })
      queryClient.invalidateQueries({
        queryKey: ['comment', variables.sentenceId],
      })
      queryClient.invalidateQueries({
        queryKey: ['comment', variables.sentenceId, variables.commentId],
      })
    },
  })
}

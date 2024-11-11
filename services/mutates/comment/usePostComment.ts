import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface IComment {
  userId?: string
  content: string
  sentenceId: number
  commentId: number | null
}

export default function usePostComment() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IComment) => {
      return supabase
        .from('comment')
        .insert({
          user_id: params.userId,
          content: params.content,
          sentence_id: params.sentenceId,
          comment_id: params.commentId || null,
        })
        .select()
        .single()
    },
    onSettled: (_, __, variables) => {
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

import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface IComment {
  email: string
  userName: string
  userId: string
  content: string
  sentenceId: number
  avatarUrl: string | null
  commentId: number | null
}

export const usePostComment = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IComment) => {
      return supabase
        .from('comment')
        .insert({
          email: params.email,
          user_name: params.userName,
          user_id: params.userId,
          content: params.content,
          sentence_id: params.sentenceId,
          avatar_url: params.avatarUrl || null,
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
        queryKey: ['comment', variables.sentenceId],
      })
      queryClient.invalidateQueries({
        queryKey: ['comment', variables.commentId],
      })
    },
  })
}

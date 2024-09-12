import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface IComment {
  email: string
  userName: string
  userId: string
  content: string
  sentenceId: string | null
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
          sentence_id: params.sentenceId || null,
          avatar_url: params.avatarUrl || null,
          comment_id: params.commentId || null,
        })
        .select()
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ['comment', data?.[0]?.post_id],
      })
    },
  })
}

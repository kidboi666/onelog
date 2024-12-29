import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface IComment {
  userId?: string
  content: string
  postId: number
  commentId: number | null
}

export default function usePostComment() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IComment) => {
      const { error } = await supabase
        .from('comment')
        .insert({
          user_id: params.userId,
          content: params.content,
          post_id: params.postId,
          comment_id: params.commentId || null,
        })
        .select()
        .single()

      if (error) {
        console.error(error)
        throw error
      }
    },
    onSuccess: (_, variables) => {
      const { postId } = variables
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.POST.DETAIL(postId) })

      openToast({
        text: TOAST_MESSAGE.COMMENT.POST.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.COMMENT.POST.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
  })
}

import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface IComment {
  content: string
  postId: number
  commentId: number | null
}

export default function useUpdateComment() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IComment) => {
      const { content, postId, commentId } = params

      let query = supabase
        .from('comment')
        .update({
          content,
        })
        .eq('post_id', postId)

      if (commentId) {
        query = query.eq('comment_id', commentId)
      }

      const { error } = await query

      if (error) {
        console.error(error)
        throw error
      }
    },
    onSuccess: (_, variables) => {
      const { postId } = variables
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.POST.DETAIL(postId),
      })

      openToast({ text: TOAST_MESSAGE.COMMENT.UPDATE.SUCCESS, type: TOAST_TYPE.SUCCESS })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.COMMENT.UPDATE.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
  })
}

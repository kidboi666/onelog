import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'

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

      openToast({
        text: TOAST_MESSAGE.COMMENT.UPDATE.SUCCESS,
        type: ToastType.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.COMMENT.UPDATE.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
  })
}

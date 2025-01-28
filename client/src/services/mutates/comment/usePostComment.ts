import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'

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
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.POST.DETAIL(postId),
      })

      openToast({
        text: TOAST_MESSAGE.COMMENT.POST.SUCCESS,
        type: ToastType.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.COMMENT.POST.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
  })
}

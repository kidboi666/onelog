import { deleteComment } from '@/src/services/supabase/comment'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { IDeleteComment } from '@/src/types/dtos/comment'
import { Toast } from '@/src/types/enums/index'

export default function useDeleteComment() {
  const queryClient = getQueryClient()
  const router = useRouter()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IDeleteComment) =>
      deleteComment(params.commentId),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.COMMENT.DELETE.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
    onSettled: (data, error, variables, context) => {
      const { postId } = variables
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.POST.DETAIL(postId),
      })
      openToast({
        text: TOAST_MESSAGE.COMMENT.DELETE.SUCCESS,
        type: Toast.SUCCESS,
      })

      router.back()
    },
  })
}

import { commentAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { IUpdateComment } from '@/src/types/dtos/comment'
import { Toast } from '@/src/types/enums/index'

export default function useUpdateComment() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IUpdateComment) =>
      commentAdapter.updateComment(params),
    onSuccess: (_, variables) => {
      const { postId } = variables
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.POST.DETAIL(postId),
      })

      openToast({
        text: TOAST_MESSAGE.COMMENT.UPDATE.SUCCESS,
        type: Toast.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.COMMENT.UPDATE.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}

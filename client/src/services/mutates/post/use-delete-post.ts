import { postAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { Toast } from '@/src/types/enums/index'

export default function useDeletePost() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (postId: number) => postAdapter.deletePost(postId),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.POST.DELETE.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
    onSettled: (_, __, postId) => {
      const queryKeys = [QUERY_KEY.POST.PUBLIC, QUERY_KEY.POST.DETAIL(postId)]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )
      openToast({
        text: TOAST_MESSAGE.POST.DELETE.SUCCESS,
        type: Toast.SUCCESS,
      })
    },
  })
}

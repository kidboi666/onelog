import { postAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ICreatePost } from '@/src/types/dtos/post'
import { Toast } from '@/src/types/enums/index'

export default function useCreatePost() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: ICreatePost) => postAdapter.createPost(params),
    onSuccess: (_, variables) => {
      const queryKeys = [
        QUERY_KEY.POST.PUBLIC,
        QUERY_KEY.GARDEN(variables.meId),
        QUERY_KEY.POST.COUNT.TOTAL(variables.meId),
      ]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )

      openToast({
        text: TOAST_MESSAGE.POST.POST.SUCCESS,
        type: Toast.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.POST.POST.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}

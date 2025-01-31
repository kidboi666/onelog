import { postAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { IUpdatePost } from '@/src/types/dtos/post'
import { PostType, Toast } from '@/src/types/enums/index'

export default function useUpdatePost() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IUpdatePost) => postAdapter.updatePost(params),
    onSuccess: (_, variables) => {
      const { id, meId } = variables
      const queryKeys = [
        QUERY_KEY.POST.PUBLIC,
        QUERY_KEY.POST.DETAIL(id),
        QUERY_KEY.POST.POST_TYPE(PostType.ARTICLE, meId),
        QUERY_KEY.POST.POST_TYPE(PostType.JOURNAL, meId),
      ]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )

      openToast({
        text: TOAST_MESSAGE.POST.UPDATE.SUCCESS,
        type: Toast.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.POST.DELETE.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}

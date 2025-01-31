import { likeAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ILike } from '@/src/types/entities/like'
import { Toast } from '@/src/types/enums/index'

export default function useHandleLikePost() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: ILike) => likeAdapter.handleLike(params),
    onError: (error, variables) => {
      const { isLike } = variables
      openToast({
        text: isLike
          ? TOAST_MESSAGE.LIKE.CANCEL.EXCEPTION
          : TOAST_MESSAGE.LIKE.SEND.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
    onSettled: (_, __, variables) => {
      const {
        postId,
        meId,
        isLike,
        authorId,
        postType,
        startOfDay = null,
        endOfDay = null,
      } = variables
      openToast({
        text: isLike
          ? TOAST_MESSAGE.LIKE.CANCEL.SUCCESS
          : TOAST_MESSAGE.LIKE.SEND.SUCCESS,
        type: Toast.SUCCESS,
      })

      const queryKeys = [
        QUERY_KEY.POST.PUBLIC,
        QUERY_KEY.POST.LIKED(authorId, meId),
        QUERY_KEY.POST.THAT_DAY(startOfDay, endOfDay, authorId),
        QUERY_KEY.POST.DETAIL(postId),
        QUERY_KEY.POST.POST_TYPE(postType, authorId),
        QUERY_KEY.POST.CHECK_LIKED(postId, meId),
      ]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )
    },
  })
}

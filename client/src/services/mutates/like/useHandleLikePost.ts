import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { PostType, ToastType } from '@/src/types/enums'

interface IFavorite {
  postId?: number
  meId?: string | null
  postType?: PostType
  authorId?: string | null
  startOfDay?: string | null
  endOfDay?: string | null
}

export default function useHandleLikePost(isLike: boolean | null | undefined) {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IFavorite) => {
      let query: any = supabase.from('like')

      if (isLike) {
        query = query
          .delete()
          .eq('user_id', params.meId)
          .eq('post_id', params.postId)
      } else {
        query = query
          .insert({
            post_id: Number(params.postId),
            user_id: params.meId,
          })
          .select()
      }

      const { data, error } = await query

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onError: (error) => {
      openToast({
        text: isLike
          ? TOAST_MESSAGE.LIKE.CANCEL.EXCEPTION
          : TOAST_MESSAGE.LIKE.SEND.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
    onSettled: (_, __, variables) => {
      openToast({
        text: isLike
          ? TOAST_MESSAGE.LIKE.CANCEL.SUCCESS
          : TOAST_MESSAGE.LIKE.SEND.SUCCESS,
        type: ToastType.SUCCESS,
      })
      const {
        postId,
        meId,
        authorId,
        postType,
        startOfDay = null,
        endOfDay = null,
      } = variables

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

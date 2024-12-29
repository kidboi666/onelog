import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface IFavorite {
  postId?: number
  meId?: string | null
  postType?: 'journal' | 'article'
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
        query = query.delete().eq('user_id', params.meId).eq('post_id', params.postId)
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
        text: isLike ? TOAST_MESSAGE.LIKE.CANCEL.EXCEPTION : TOAST_MESSAGE.LIKE.SEND.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
    onSettled: (_, __, variables) => {
      openToast({
        text: isLike ? TOAST_MESSAGE.LIKE.CANCEL.SUCCESS : TOAST_MESSAGE.LIKE.SEND.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })
      const { postId, meId, authorId, postType, startOfDay = null, endOfDay = null } = variables

      const queryKeys = [
        queryKey.post.public,
        queryKey.post.liked(authorId, meId),
        queryKey.post.thatDay(startOfDay, endOfDay, authorId),
        queryKey.post.detail(postId),
        queryKey.post.byPostType(postType, authorId),
        queryKey.post.checkLiked(postId, meId),
      ]
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))
    },
  })
}

import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { Tables } from '@/types/supabase'
import { useMutation } from '@tanstack/react-query'

interface IFavorite {
  commentId: number
  userId: string
}

export default function useFavoriteComment() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IFavorite) => {
      const me = queryClient.getQueryData<Tables<'user_info'>>(['me', 'info'])
      const isFavorite = me?.favorite_comment?.find(
        (comment: Tables<'comment'>) => comment.id === params.commentId,
      )

      return isFavorite
        ? supabase.rpc('decrement_favorite_comment', {
            comment_id: params.commentId,
            user_uuid: params.userId,
          })
        : supabase.rpc('increment_favorite_comment', {
            comment_id: params.commentId,
            user_uuid: params.userId,
          })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    },
  })
}

import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { queryKey } from '@/lib/tanstack/query-key'
import { useMutation } from '@tanstack/react-query'

interface IFavorite {
  postId?: number
  meId?: string | null
  postType?: 'journal' | 'article'
  authorId?: string | null
  startOfDay?: string | null
  endOfDay?: string | null
}

export default function useLikepost() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IFavorite) => {
      const { data, error } = await supabase
        .from('like')
        .insert({
          post_id: Number(params.postId),
          user_id: params.meId,
        })
        .select()

      if (error) {
        console.error('좋아요 실패:', error)
      }

      return data
    },
    onSettled: (_, __, variables) => {
      const {
        postId,
        meId,
        authorId,
        postType,
        startOfDay = null,
        endOfDay = null,
      } = variables
      queryClient.invalidateQueries({ queryKey: queryKey.post.public })
      queryClient.invalidateQueries({
        queryKey: queryKey.post.liked(authorId, meId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.post.thatDay(startOfDay, endOfDay, authorId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.post.detail(postId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.post.byPostType(postType, authorId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.post.checkLiked(postId, meId),
      })
    },
  })
}

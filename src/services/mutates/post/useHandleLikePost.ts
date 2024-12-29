import { useToast } from '@/src/store/useToast'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'

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
        console.error('좋아요/삭제 실패:', error)
      }

      return data
    },
    onSettled: (data, error, variables) => {
      openToast({
        text: isLike ? '좋아하는 게시물에서 삭제하였습니다.' : '좋아하는 게시물로 등록하였습니다.',
        type: 'info',
      })
      const { postId, meId, authorId, postType, startOfDay = null, endOfDay = null } = variables

      void queryClient.invalidateQueries({ queryKey: queryKey.post.public })
      void queryClient.invalidateQueries({
        queryKey: queryKey.post.liked(authorId, meId),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKey.post.thatDay(startOfDay, endOfDay, authorId),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKey.post.detail(postId),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKey.post.byPostType(postType, authorId),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKey.post.checkLiked(postId, meId),
      })
    },
  })
}

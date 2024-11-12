import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface IFavorite {
  sentenceId?: number
  meId?: string | null
  postType?: 'journal' | 'article'
}

export default function useLikeSentence() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IFavorite) => {
      const { data, error } = await supabase
        .from('like')
        .insert({
          post_id: Number(params.sentenceId),
          user_id: params.meId,
        })
        .select()

      if (error) {
        console.error('좋아요 실패:', error)
      }

      return data
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: ['all_sentence'] })
      queryClient.invalidateQueries({
        queryKey: ['sentence', variables.sentenceId],
      })
      queryClient.invalidateQueries({
        queryKey: ['sentence', variables.postType, variables.meId],
      })
      queryClient.invalidateQueries({
        queryKey: ['sentence', 'isLiked', variables.sentenceId],
      })
    },
  })
}

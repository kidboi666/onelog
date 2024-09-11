import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { Tables } from '@/types/supabase'
import { useMutation } from '@tanstack/react-query'

interface IFavorite {
  sentenceId: number
  userId: string
}

export default function useFavoriteSentence() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IFavorite) => {
      const allSentence = queryClient.getQueryData<Tables<'sentence'>[]>([
        'all_sentence',
      ])
      const me = queryClient.getQueryData<Tables<'user_info'>>(['me', 'info'])
      const targetSentence = allSentence?.find(
        (sentence: Tables<'sentence'>) => sentence.id === params.sentenceId,
      )
      const isFavorite = targetSentence?.favorited_user_id?.find(
        (userId) => userId === me?.id,
      )

      return isFavorite
        ? supabase.rpc('decrement_favorite', {
            sentence_id: params.sentenceId,
            user_uuid: params.userId,
          })
        : supabase.rpc('increment_favorite', {
            sentence_id: params.sentenceId,
            user_uuid: params.userId,
          })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['all_sentence'] })
    },
  })
}

import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { ISentenceInfiniteQuery } from '@/types/sentence'
import { Tables } from '@/types/supabase'
import { useMutation } from '@tanstack/react-query'

interface IFavorite {
  sentenceId?: number
  meId: string | null
}

export default function useFavoriteSentence() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IFavorite) => {
      const allSentence = queryClient.getQueryData<ISentenceInfiniteQuery>([
        'all_sentence',
      ])
      const flatSentence = allSentence?.pages.flatMap((sentence) => sentence)
      const targetSentence = flatSentence?.find(
        (sentence: Tables<'sentence'>) => sentence.id === params.sentenceId,
      )
      const isFavorite = targetSentence?.favorited_user_id?.find(
        (userId) => userId === params.meId,
      )

      return isFavorite
        ? supabase.rpc('decrement_favorite', {
            sentence_id: params.sentenceId,
            user_uuid: params.meId,
          })
        : supabase.rpc('increment_favorite', {
            sentence_id: params.sentenceId,
            user_uuid: params.meId,
          })
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: ['all_sentence'] })
      queryClient.invalidateQueries({
        queryKey: ['sentence', variables.sentenceId],
      })
    },
  })
}

import { supabase } from '@/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

interface IFavorite {
  sentenceId: number
  userId: string
}

export default function useDeleteFavorite() {
  return useMutation({
    mutationFn: async (params: IFavorite) => {
      await supabase.rpc('decrement_favorite', {
        sentence_id: params.sentenceId,
        user_uuid: params.userId,
      })
    },
  })
}

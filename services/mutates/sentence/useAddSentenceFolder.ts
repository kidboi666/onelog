import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface ISentenceFolder {
  name: string
  color: string
  index: number
  userId: string
}

export default function useAddSentenceFolder() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: ISentenceFolder) => {
      return supabase
        .from('sentence_folder')
        .insert({
          name: params.name,
          color: params.color,
          index: params.index,
          user_id: params.userId,
        })
        .select()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentence_folder'] })
    },
  })
}

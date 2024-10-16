import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface ISentenceFolder {
  name: string
  color: string
  index: number
  id: number
}

export default function useUpdateSentenceFolder() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: ISentenceFolder) => {
      return supabase
        .from('sentence_folder')
        .update({
          name: params.name,
          color: params.color,
          index: params.index,
        })
        .eq('id', params.id)
        .select()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentence_folder'] })
    },
  })
}

import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { ISentence } from '@/types/sentence'
import { useMutation } from '@tanstack/react-query'

export default function useAddSentence() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: ISentence) => {
      await new Promise((res) => setTimeout(res, 1000))
      return supabase
        .from('sentence')
        .insert({ ...params })
        .select()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentence'] })
      queryClient.invalidateQueries({ queryKey: ['garden'] })
    },
  })
}

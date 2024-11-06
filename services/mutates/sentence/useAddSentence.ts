import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface IAddSentence {
  user_id: string
  title: string | null
  content: string
  emotion_level: string | null
  tags: string[]
  access_type: 'private' | 'public'
  post_type: 'article' | 'journal'
}

export default function useAddSentence() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IAddSentence) => {
      return supabase
        .from('sentence')
        .insert({ ...params })
        .select()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all_sentence'] })
      queryClient.invalidateQueries({ queryKey: ['sentence'] })
      queryClient.invalidateQueries({ queryKey: ['garden'] })
      queryClient.invalidateQueries({ queryKey: ['sentence_count'] })
    },
  })
}

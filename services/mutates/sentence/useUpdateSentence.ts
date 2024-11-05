import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface IUpdateSentence {
  user_id: string
  id: number
  title?: string
  content: string
  emotion_level: string | null
  tags: string[]
  access_type: 'private' | 'public'
  post_type: 'article' | 'journal'
}

export default function useUpdateSentence() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IUpdateSentence) => {
      return supabase
        .from('sentence')
        .update({ ...params })
        .eq('id', params.id)
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['all_sentence'] })
      queryClient.invalidateQueries({ queryKey: ['sentence'] })
      queryClient.invalidateQueries({ queryKey: ['garden'] })
    },
  })
}

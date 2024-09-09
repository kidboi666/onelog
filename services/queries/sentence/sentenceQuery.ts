import { Tables } from '@/types/supabase'
import { queryOptions } from '@tanstack/react-query'

export const sentenceQuery = {
  getAllSentence: (supabase: any, userId: string) =>
    queryOptions({
      queryKey: ['sentence'],
      queryFn: async () => {
        const { data } = await supabase
          .from('sentence')
          .select()
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        return data
      },
      enabled: !!userId,
    }),
  getSentence: (supabase: any, sentenceId: string) =>
    queryOptions<Tables<'sentence'>>({
      queryKey: ['sentence', sentenceId],
      queryFn: async () => {
        const { data } = await supabase
          .from('sentence')
          .select()
          .eq('id', sentenceId)
          .single()

        return data
      },
    }),
}

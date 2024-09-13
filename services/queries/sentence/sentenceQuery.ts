import { Tables } from '@/types/supabase'
import { queryOptions } from '@tanstack/react-query'

export const sentenceQuery = {
  getAllSentence: (supabase: any) =>
    queryOptions<Tables<'sentence'>[]>({
      queryKey: ['all_sentence'],
      queryFn: async () => {
        const { data } = await supabase
          .from('sentence')
          .select()
          .order('created_at', { ascending: false })
        return data
      },
    }),
  getAllMySentence: (supabase: any, userId: string) =>
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

  getMyFavoriteSentence: (supabase: any, userId: string) =>
    queryOptions({
      queryKey: ['favorite_sentences'],
      queryFn: async () => {
        const { data } = await supabase
          .from('user_info')
          .select('favorite_sentence_id')
          .eq('id', userId)
          .single()

        return data
      },
    }),

  getMyUsedWords: (supabase: any, userId: string) =>
    queryOptions<Tables<'user_words'>>({
      queryKey: ['favorite_words', userId],
      queryFn: async () => {
        const { data } = await supabase
          .from('user_words')
          .select()
          .eq('user_id', userId)
          .single()

        return data
      },
    }),

  getUsedWords: (supabase: any, word: string, trigger: boolean) =>
    queryOptions<Tables<'word_dictionary'>>({
      queryKey: ['words', word],
      queryFn: async () => {
        const { data } = await supabase
          .from('word_dictionary')
          .select()
          .eq('word', word)
          .single()

        return data
      },
      staleTime: 0,
      enabled: trigger,
    }),
}

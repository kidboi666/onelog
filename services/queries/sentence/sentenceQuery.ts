import { queryOptions } from '@tanstack/react-query'
import { SupabaseClient } from '@supabase/supabase-js'
import { ISentenceWithUserInfo } from '@/types/sentence'
import { Tables } from '@/types/supabase'

export const sentenceQuery = {
  getAllSentence: (supabase: SupabaseClient) =>
    queryOptions<ISentenceWithUserInfo[] | null>({
      queryKey: ['all_sentence'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('sentence')
          .select(
            `
            *,  
            user_info(
              email,
              user_name,
              avatar_url
            )
            `,
          )
          .eq('access_type', 'public')
          .order('created_at', { ascending: false })

        return data
      },
    }),

  getAllMySentence: (supabase: SupabaseClient, userId: string) =>
    queryOptions<ISentenceWithUserInfo[] | null>({
      queryKey: ['sentence', userId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('sentence')
          .select(
            `
            *,  
            user_info(
              email,
              user_name,
              avatar_url
            )
            `,
          )
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        return data
      },
      enabled: !!userId,
    }),

  getSentence: (supabase: SupabaseClient, sentenceId: string) =>
    queryOptions<ISentenceWithUserInfo>({
      queryKey: ['sentence', sentenceId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('sentence')
          .select(
            `
            *,  
            user_info(
              email,
              user_name,
              avatar_url,
              about_me
            )
            `,
          )
          .eq('id', sentenceId)
          .single()

        return data
      },
    }),

  getMyFavoriteSentence: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: ['favorite_sentences', userId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('user_info')
          .select('favorite_sentence_id')
          .eq('id', userId)
          .single()

        return data
      },
    }),

  getMyUsedWords: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'user_words'>>({
      queryKey: ['favorite_words', userId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('user_words')
          .select()
          .eq('user_id', userId)
          .single()

        return data
      },
    }),

  getUsedWords: (supabase: SupabaseClient, word: string, trigger: boolean) =>
    queryOptions<Tables<'word_dictionary'>>({
      queryKey: ['words', word],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('word_dictionary')
          .select()
          .eq('word', word)
          .single()

        return data
      },
      enabled: trigger,
    }),
}

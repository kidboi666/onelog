import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { SupabaseClient } from '@supabase/supabase-js'
import { ISentenceWithUserInfo } from '@/types/sentence'
import { Tables } from '@/types/supabase'

export const sentenceQuery = {
  getAllSentence: (supabase: SupabaseClient, limit: number) =>
    infiniteQueryOptions({
      queryKey: ['all_sentence'],
      queryFn: async ({ pageParam = 0 }) => {
        const { data } = await supabase
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
          .range(pageParam, pageParam + limit - 1)

        return data
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) return undefined // 마지막 페이지에 도달하면 undefined 반환
        return allPages.length * limit // 다음 페이지의 offset 반환
      },
    }),

  getMySentenceThatDay: (
    supabase: SupabaseClient,
    userId: string,
    startOfDay: string | null,
    endOfDay: string | null,
  ) =>
    queryOptions<ISentenceWithUserInfo[] | null>({
      queryKey: ['sentence', `${startOfDay}${endOfDay}`],
      queryFn: async () => {
        const { data } = await supabase
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
          .gte('created_at', startOfDay)
          .lte('created_at', endOfDay)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        return data
      },
      enabled: !!startOfDay && !!endOfDay,
    }),

  getAllMySentence: (
    supabase: SupabaseClient,
    userId: string,
    postType: 'journal' | 'article',
    limit: number = 10,
  ) =>
    infiniteQueryOptions({
      queryKey: ['sentence', postType],
      queryFn: async ({ pageParam = 0 }) => {
        const { data } = await supabase
          .from('sentence')
          .select()
          .eq('user_id', userId)
          .eq('post_type', postType)
          .order('created_at', { ascending: false })
          .range(pageParam, pageParam + limit - 1)

        return data
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) return undefined
        return allPages.length * limit
      },
    }),

  getAllMySentenceCount: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: ['sentence_count'],
      queryFn: async () => {
        const { count } = await supabase
          .from('sentence')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)

        return count
      },
      enabled: !!userId,
    }),

  getAllSentenceCount: (
    supabase: SupabaseClient,
    userId: string,
    postType: 'journal' | 'article',
  ) =>
    queryOptions({
      queryKey: ['sentence_count', postType],
      queryFn: async () => {
        const { count } = await supabase
          .from('sentence')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('post_type', postType)

        return { count, postType }
      },
      enabled: !!userId,
    }),

  getSentence: (supabase: SupabaseClient, sentenceId?: number) =>
    queryOptions<ISentenceWithUserInfo>({
      queryKey: ['sentence', sentenceId],
      queryFn: async () => {
        const { data } = await supabase
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
      enabled: !!sentenceId,
    }),

  getMyFavoriteSentence: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: ['favorite_sentences', userId],
      queryFn: async () => {
        const { data } = await supabase
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
        const { data } = await supabase
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
        const { data } = await supabase
          .from('word_dictionary')
          .select()
          .eq('word', word)
          .single()

        return data
      },
      enabled: trigger,
    }),
}

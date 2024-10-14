import { Tables } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const userQuery = {
  getUserInfo: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'user_info'>>({
      queryKey: ['user', userId],
      queryFn: async () => {
        const { data } = await supabase
          .from('user_info')
          .select()
          .eq('id', userId)
          .single()

        return data
      },
    }),
  getUsedWords: (supabase: SupabaseClient, userId: string) =>
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
}

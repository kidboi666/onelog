import { createWordAdapter } from '@/src/adapters'
import { QUERY_KEY } from '@/src/constants/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { IUsedWord, IWord } from '@/src/types/word'
import { APIError } from '@/src/utils/fetcher'

export const wordQuery = {
  getMyUsedWords: (supabase: SupabaseClient, userId: string) =>
    queryOptions<IUsedWord[], APIError>({
      queryKey: QUERY_KEY.WORD.USED(userId),
      queryFn: () => createWordAdapter(supabase).getMyUsedWords({ userId }),
    }),

  getUsedWords: (supabase: SupabaseClient, word: string, trigger: boolean) =>
    queryOptions<IWord[], APIError>({
      queryKey: QUERY_KEY.WORD.DETAIL(word),
      queryFn: () => createWordAdapter(supabase).getUsedWords({ word }),
      enabled: trigger,
    }),
}

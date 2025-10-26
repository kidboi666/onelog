import { getMyUsedWords, getUsedWords } from '@/src/services/supabase/word'
import { QUERY_KEY } from '@/src/constants/index'
import { APIError } from '@/src/error/index'
import { queryOptions } from '@tanstack/react-query'
import { IUsedWord, IWord } from '@/src/types/entities/word'

export const wordQuery = {
  getMyUsedWords: (userId: string) =>
    queryOptions<IUsedWord | null, APIError>({
      queryKey: QUERY_KEY.WORD.USED(userId),
      queryFn: () => getMyUsedWords(userId),
    }),

  getUsedWords: (word: string, trigger: boolean) =>
    queryOptions<IWord | null, APIError>({
      queryKey: QUERY_KEY.WORD.DETAIL(word),
      queryFn: () => getUsedWords(word),
      enabled: trigger,
    }),
}

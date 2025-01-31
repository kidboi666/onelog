import { SupabaseClient } from '@supabase/supabase-js'
import { IUsedWord, IWord } from '@/src/types/entities/word'
import { IWordBaseAdapter } from '@/src/types/services/index'
import { processQuery } from '../query-helpers'

export const createSupabaseWordAdapter = (
  supabase: SupabaseClient,
): IWordBaseAdapter => {
  // 대상 유저가 쓴 단어들 가져오기
  const getMyUsedWords = async (userId: string): Promise<IUsedWord> => {
    const query = supabase
      .from('user_words')
      .select()
      .eq('user_id', userId)
      .single()

    return processQuery(query)
  }

  // 사전에서 단어 찾기
  const getUsedWords = async (word: string): Promise<IWord> => {
    const query = supabase
      .from('word_dictionary')
      .select()
      .eq('word', word)
      .single()

    return processQuery(query)
  }

  return {
    getMyUsedWords,
    getUsedWords,
  }
}

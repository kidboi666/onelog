import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'
import { IUsedWord, IWord } from '@/src/types/entities/word'
import { processQuery } from '@/src/services/supabase/helpers'

// 대상 유저가 쓴 단어들 가져오기
export const getMyUsedWords = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<IUsedWord | null> => {
  const query = supabase
    .from('user_words')
    .select()
    .eq('user_id', userId)
    .single()

  return processQuery(query)
}

// 사전에서 단어 찾기
export const getUsedWords = async (
  word: string,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<IWord | null> => {
  const query = supabase
    .from('word_dictionary')
    .select()
    .eq('word', word)
    .single()

  return processQuery(query)
}

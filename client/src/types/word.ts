import { Tables } from '@/src/types/supabase'

/**
 * Class Interface
 */
export interface IWordBaseAdapter {
  // @TODO 반환값 타입핑
  getMyUsedWords({ userId }: IGetMyUsedWords): Promise<IUsedWord[]>
  getUsedWords({ word }: IGetUsedWords): Promise<IWord[]>
}

/**
 * DTO
 */
export interface IGetMyUsedWords {
  userId: string
}

export interface IGetUsedWords {
  word: string
}

export interface IFavoriteWord {
  word: string
  count: number
}

/**
 * Supabase
 */
export interface ISupabaseUsedWord extends Tables<'user_words'> {}

export interface ISupabaseWord extends Tables<'word_dictionary'> {}

/**
 * Adapter
 */
export type IUsedWord = ISupabaseUsedWord

export type IWord = ISupabaseWord

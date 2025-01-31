import { IFavoriteWord } from '@/src/types/dtos/word'

/**
 * Base
 */
export interface IUsedWordBase {
  createdAt: string
  id: number
  userId: string
  words: IFavoriteWord[] | null
}

/**
 * Supabase
 */
export interface ISupabaseUsedWord extends IUsedWordBase {}

export interface ISupabaseWord {
  count: number
  createdAt: string
  id: number
  word: string
}

/**
 * Adapter
 */
export type IUsedWord = ISupabaseUsedWord
export type IWord = ISupabaseWord

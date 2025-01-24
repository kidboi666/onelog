import { SupabaseClient } from '@supabase/supabase-js'
import {
  IGetMyUsedWords,
  IGetUsedWords,
  IWordBaseAdapter,
} from '@/src/types/word'
import { APIError } from '@/src/utils/fetcher'

export class SupabaseWordAdapter implements IWordBaseAdapter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getMyUsedWords({ userId }: IGetMyUsedWords): Promise<any> {
    const { data, error } = await this.supabase
      .from('user_words')
      .select()
      .eq('user_id', userId)
      .single()

    if (error) {
      throw new APIError(error.code, error.message, error)
    }

    return data
  }

  async getUsedWords({ word }: IGetUsedWords): Promise<any> {
    const { data, error } = await this.supabase
      .from('word_dictionary')
      .select()
      .eq('word', word)
      .single()

    if (error) {
      throw new APIError(error.code, error.message, error)
    }

    return data
  }
}

import { Tables } from './supabase'

export interface IFavoriteWord {
  word: string
  count: number
}

export interface ISentenceWithUserInfo extends Tables<'sentence'> {
  user_info: Pick<Tables<'user_info'>, 'user_name' | 'email' | 'avatar_url'>
}

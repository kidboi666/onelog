import { Tables } from './supabase'
import { IComment } from '@/src/types/comment'

export interface IFavoriteWord {
  word: string
  count: number
}

export interface IPost
  extends Omit<Tables<'post'>, 'post_type' | 'access_type' | 'emotion_level'> {
  user_info: Pick<
    Tables<'user_info'>,
    'user_name' | 'email' | 'avatar_url' | 'about_me'
  >
  post_type: 'article' | 'journal'
  access_type: 'public' | 'private'
  emotion_level: '0%' | '25%' | '50%' | '75%' | '100%' | null
  comments: IComment[]
  like_count: { count: number }[]
  comment_count: { count: number }[]
}

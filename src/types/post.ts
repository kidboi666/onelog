import { IComment } from '@/src/types/comment'
import { Tables } from './supabase'

export interface IFavoriteWord {
  word: string
  count: number
}

/**
 * TODO enum 적용 @kidboi666
 */

export enum AccessType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum PostType {
  ARTICLE = 'article',
  JOURNAL = 'journal',
}

export interface IPost
  extends Omit<Tables<'post'>, 'post_type' | 'access_type' | 'emotion_level'> {
  user_info: Pick<
    Tables<'user_info'>,
    'user_name' | 'email' | 'avatar_url' | 'about_me'
  >
  post_type: PostType
  access_type: AccessType
  emotion_level: '0%' | '25%' | '50%' | '75%' | '100%' | null
  comments: IComment[] | []
  is_liked: { like: string }[] | []
  like_count: { count: number }[] | []
  comment_count: { count: number }[] | []
}

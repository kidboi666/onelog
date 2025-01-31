import { IComment } from '@/src/types/entities/comment'
import { Access, EmotionLevel, PostType } from '@/src/types/enums/index'

/**
 * Base Entity
 */
interface IBasePost {
  id: number
  tags: string[] | null
  title: string | null
  userId: string
  createdAt: string
  content: string
  postType: PostType
  accessType: Access
  emotionLevel: EmotionLevel | null
  userInfo: {
    userName: string | null
    email: string
    avatarUrl: string | null
    aboutMe: string | null
  }
}

/**
 * Supabase Entity
 */
export interface ISupabasePost extends IBasePost {
  isLiked: { like: string }[] | []
  likeCount: { count: number }[] | []
  commentCount: { count: number }[] | []
}

export interface ISupabasePostDetail extends ISupabasePost {
  comments: IComment[] | []
}

export interface ISupabaseLikedPost extends Omit<ISupabasePost, 'is_liked'> {
  post: ISupabasePost
}

/**
 * Nest Entity
 */
export interface INestPost extends IBasePost {
  updatedAt: string
  isLiked: { like: string }[]
  likeCount: { count: number }[]
  commentCount: { count: number }[]
}

export interface INestPostDetail extends INestPost {
  comments: IComment[] | []
}

/**
 * Adapter Type
 */
export type IPost = ISupabasePost | INestPost
export type ILikedPost = ISupabaseLikedPost
export type IPostDetail = ISupabasePostDetail | INestPostDetail

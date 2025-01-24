import { INestUserInfo } from '@/src/types/auth'
import { IComment } from '@/src/types/comment'
import { AccessType, EmotionLevel, PostType } from '@/src/types/enums'
import { Tables } from './supabase'

/**
 * Class Interface
 */
export interface IPostBaseAdapter {
  getAllPosts(params: IGetAllPosts): Promise<IPost[]>
  getPost(params: IGetPost): Promise<IPostDetail>
  getLikedPosts(params: IGetLikedPosts): Promise<ILikedPost[]>
  getUserPostThatDay(params: IGetUserPostsThatDay): Promise<IPost[]>
  getAllUserPosts(params: IGetAllUserPosts): Promise<IPost[]>
  createPost(params: ICreatePost): Promise<void>
  deletePost(postId: number): Promise<void>
  updatePost(params: IUpdatePost): Promise<void>
}

/**
 * DTO
 */
export interface IGetAllPosts {
  meId?: string | null
  pageParam: number
  limit: number
}

export interface IGetPost {
  postId: number
  meId?: string | null
}

export interface IGetLikedPosts {
  authorId: string
  meId?: string | null
  pageParam: number
  limit: number
}

export interface IGetUserPostsThatDay {
  authorId: string
  startOfDay: string | null
  endOfDay: string | null
  meId?: string | null
}

export interface IGetAllUserPosts {
  authorId: string
  postType: PostType
  pageParam: number
  limit: number
  meId?: string | null
}

export interface ICreatePost {
  title: string | null
  content: string
  emotionLevel: EmotionLevel
  tags: string[]
  accessType: AccessType
  postType: PostType
  meId: string
}

export interface IUpdatePost {
  id: number
  meId: string
  title: string | null
  content: string
  emotionLevel: string | null
  tags: string[]
  accessType: AccessType
  postType: PostType
}

/**
 * Supabase
 */
export interface ISupabasePost
  extends Omit<Tables<'post'>, 'post_type' | 'access_type' | 'emotion_level'> {
  user_info: Pick<
    Tables<'user_info'>,
    'user_name' | 'email' | 'avatar_url' | 'about_me'
  >
  post_type: PostType
  access_type: AccessType
  emotion_level: '0%' | '25%' | '50%' | '75%' | '100%' | null
  is_liked: { like: string }[] | []
  like_count: { count: number }[] | []
  comment_count: { count: number }[] | []
}

export interface ISupabasePostDetail extends ISupabasePost {
  comments: IComment[] | []
}

export interface ISupabaseLikedPost extends Omit<ISupabasePost, 'is_liked'> {
  post: ISupabasePost
}

/**
 * Nest
 */
export interface INestPost {
  id: number
  userId: string
  postType: PostType
  accessType: AccessType
  emotionLevel: EmotionLevel
  content: string
  tags: string[]
  commentCount: number
  createdAt: string
  updatedAt: string
  userInfo: INestUserInfo
}

export interface INestPostDetail extends INestPost {
  comments: IComment[] | []
}

/**
 * Adapter
 */
export type IPost = ISupabasePost | INestPost

export type ILikedPost = ISupabaseLikedPost

export type IPostDetail = ISupabasePostDetail | INestPostDetail

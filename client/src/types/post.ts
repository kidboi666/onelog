import { INestUserInfo } from '@/src/types/auth'
import { IComment } from '@/src/types/comment'
import { AccessType, EmotionLevel, PostType } from '@/src/types/enums'
import { Tables } from './supabase'

/**
 * Class Interface
 */
export interface IPostBaseAdapter {
  getAllPosts({ meId, pageParam, limit }: IGetAllPosts): Promise<IPost[]>
  getPost({ postId, meId }: IGetPost): Promise<IPostDetail>
  getLikedPosts({
    authorId,
    meId,
    pageParam,
    limit,
  }: IGetLikedPosts): Promise<IPost[]>
  getUserPostThatDay({
    authorId,
    startOfDay,
    endOfDay,
    meId,
  }: IGetUserPostsThatDay): Promise<IPost[]>
  getAllUserPosts({
    authorId,
    postType,
    pageParam,
    limit,
  }: IGetAllUserPosts): Promise<IPost[]>
  createPost({
    title,
    content,
    emotionLevel,
    tags,
    accessType,
    postType,
  }: ICreatePost): Promise<void>
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

export type IPostDetail = ISupabasePostDetail | INestPostDetail

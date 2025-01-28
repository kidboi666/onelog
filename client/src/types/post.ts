import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { IComment } from '@/src/types/comment'
import { AccessType, EmotionLevel, PostType } from '@/src/types/enums'

/**
 * Class Interface
 */
export interface IPostBaseAdapter {
  getAllPosts(params: IGetAllPosts): Promise<IPost[]>
  getPost(params: IGetPost): Promise<IPostDetail | null>
  getLikedPosts(params: IGetLikedPosts): Promise<ILikedPost[]>
  getUserPostsThatDay(params: IGetUserPostsThatDay): Promise<IPost[]>
  getUserPosts(params: IGetAllUserPosts): Promise<IPost[]>
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
  emotionLevel: EmotionLevel | null
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

export interface IUpdatePostFormStates {
  emotionLevel: EmotionLevel | null
  accessType: AccessType
  postType: PostType
  content: string
  title: string | null
  tags: string[]
}

export interface IUpdatePostFormActions {
  onChangeEmotion: (emotionLevel: EmotionLevel | null) => void
  onChangeAccessType: (accessType: AccessType) => void
  onChangePostType: (postType: PostType) => void
  setContent: Dispatch<SetStateAction<string>>
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void
  setTags: Dispatch<SetStateAction<string[]>>
}

/**
 * Supabase
 */
export interface ISupabasePost {
  id: number
  tags: string[] | null
  title: string | null
  userId: string
  createdAt: string
  content: string
  postType: PostType
  accessType: AccessType
  emotionLevel: EmotionLevel | null
  userInfo: {
    userName: string | null
    email: string
    avatarUrl: string | null
    aboutMe: string | null
  }
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
 * Nest
 */
export interface INestPost {
  id: number
  userId: string
  postType: PostType
  accessType: AccessType
  emotionLevel: EmotionLevel | null
  title: string | null
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
  userInfo: {
    email: string
    userName: string | null
    avatarUrl: string | null
    aboutMe: string | null
  }
  isLiked: { like: string }[]
  likeCount: { count: number }[]
  commentCount: { count: number }[]
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

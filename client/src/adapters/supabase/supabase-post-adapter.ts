import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '@/src/lib/supabase/client'
import { AccessType } from '@/src/types/enums'
import {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  IPost,
  IPostBaseAdapter,
  ISupabasePost,
  ISupabasePostDetail,
} from '@/src/types/post'
import { APIError } from '@/src/utils/fetcher'

export class SupabasePostAdapter implements IPostBaseAdapter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAllPosts({
    pageParam,
    limit,
    meId,
  }: IGetAllPosts): Promise<ISupabasePost[]> {
    let query = this.supabase
      .from('post')
      .select<string, ISupabasePost>(
        `
        *,
        comment_count:comment(count),
        is_liked:like(user_id),
        like_count:like(count),
        user_info(
          email,
          user_name,
          avatar_url,
          about_me
        )
        `,
      )
      .eq('access_type', AccessType.PUBLIC)
      .order('created_at', { ascending: false })
      .range(pageParam, pageParam + limit - 1)

    if (meId) {
      query = query.eq('like.user_id', meId)
    }

    const { data, error } = await query

    if (error) {
      throw new APIError(error.code, error.message, error)
    }

    return data ?? []
  }

  async getLikedPosts({
    pageParam,
    limit,
    authorId,
    meId,
  }: IGetLikedPosts): Promise<ISupabasePost[]> {
    let query = this.supabase
      .from('like')
      .select(
        `
        *,
        post!like_post_id_fkey(
          *,
          comment_count:comment(count),
          liked_count:like(count),
          user_info(
            user_name,
            avatar_url,
            email,
            about_me
          )
        )
        `,
      )
      .eq('user_id', authorId)
      .order('created_at', { ascending: false })
      .range(pageParam, pageParam + limit - 1)

    const { data, error } = await query

    if (error) {
      throw new APIError(error.code, error.message, error)
    }

    let publicData
    let isMe: boolean = false

    if (meId) {
      isMe = meId === authorId
    }

    isMe
      ? (publicData = data)
      : (publicData = data?.map((item) =>
          item.post.access_type === AccessType.PUBLIC
            ? item
            : { ...item, post: { title: null, content: null } },
        ))

    return publicData
  }

  async getPost({ postId, meId }: IGetPost): Promise<ISupabasePostDetail> {
    let query: any = this.supabase
      .from('post')
      .select(
        `
        *,
        comment_count:comment(count),
        is_liked:like(user_id),
        like_count:like(count),
        comments:comment(
          *,
          user_info(
            email,
            user_name,
            avatar_url,
            about_me
          )
        ),
        user_info(
          email,
          user_name,
          avatar_url,
          about_me
        )`,
      )
      .eq('id', postId)

    if (meId) {
      query = query.eq('like.user_id', meId)
    }
    query = query.single()

    const { data, error } = await query

    if (error) {
      throw new APIError(error.code, error.message, error)
    }

    return data
  }

  async getUserPostThatDay({
    authorId,
    startOfDay,
    endOfDay,
    meId,
  }: IGetUserPostsThatDay): Promise<ISupabasePost[]> {
    let query = this.supabase
      .from('post')
      .select(
        `
        *,
        comment_count:comment(count),
        is_liked:like(user_id),
        like_count:like(count),
        user_info(
          email,
          user_name,
          avatar_url
        )
        `,
      )
      .gte('created_at', startOfDay)
      .lte('created_at', endOfDay)
      .eq('user_id', authorId)
      .eq('like.user_id', authorId)
      .order('created_at', { ascending: false })

    if (meId) {
      query = query.eq('like.user_id', meId)
    }

    const { data, error } = await query

    if (error) {
      throw new APIError(error.code, error.message, error)
    }

    let publicData
    let isMe

    if (meId) {
      isMe = meId === authorId
    }

    isMe
      ? (publicData = data)
      : (publicData = data?.map((item) =>
          item.access_type === AccessType.PUBLIC
            ? item
            : { ...item, title: null, content: null },
        ))

    return publicData
  }

  async getAllUserPosts({
    limit,
    authorId,
    postType,
    pageParam,
    meId,
  }: IGetAllUserPosts): Promise<IPost[]> {
    let query: any = supabase
      .from('post')
      .select(
        `
            *,
            comment_count:comment(count),
            is_liked:like(user_id),
            like_count:like(count),
            user_info(
              email,
              user_name,
              avatar_url
            )
            `,
      )
      .eq('user_id', authorId)
      .eq('post_type', postType)
      .order('created_at', { ascending: false })
      .range(pageParam, pageParam + limit - 1)

    if (meId) {
      query = query.eq('like.user_id', meId)
    }

    const { data, error } = await query

    if (error) {
      console.error(error)
    }

    let publicData
    let isMe

    if (meId) {
      isMe = meId === authorId
    }

    isMe
      ? (publicData = data)
      : (publicData = data?.map((item: ISupabasePost) =>
          item.access_type === AccessType.PUBLIC
            ? item
            : { ...item, content: null, title: null },
        ))

    return publicData
  }

  createPost({
    title,
    content,
    emotionLevel,
    tags,
    accessType,
    postType,
  }: ICreatePost): Promise<void> {
    return Promise.resolve(undefined)
  }
}

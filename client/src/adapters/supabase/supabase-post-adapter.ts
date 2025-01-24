import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { AccessType } from '@/src/types/enums'
import {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  IPostBaseAdapter,
  ISupabaseLikedPost,
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
        '*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), user_info(email, user_name, avatar_url, about_me)',
      )
      .eq('access_type', AccessType.PUBLIC)
      .order('created_at', { ascending: false })
      .range(pageParam, pageParam + limit - 1)

    if (meId) {
      query = query.eq('like.user_id', meId)
    }

    const { data, error } = await query
    this.handleError(error)
    return data ?? []
  }

  async getLikedPosts({
    pageParam,
    limit,
    authorId,
    meId,
  }: IGetLikedPosts): Promise<ISupabaseLikedPost[]> {
    let query = this.supabase
      .from('like')
      .select<string, ISupabaseLikedPost>(
        '*, post!like_post_id_fkey(*, comment_count:comment(count), liked_count:like(count), user_info(user_name, avatar_url, email, about_me))',
      )
      .eq('user_id', authorId)
      .order('created_at', { ascending: false })
      .range(pageParam, pageParam + limit - 1)

    const { data, error } = await query
    this.handleError(error)
    const isMe = this.isCurrentUserAuthor(authorId, meId)
    return this.filterPrivateLikedPosts(data, isMe)
  }

  async getPost({ postId, meId }: IGetPost): Promise<ISupabasePostDetail> {
    let query: any = this.supabase
      .from('post')
      .select(
        '*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), comments:comment(*, user_info(email, user_name, avatar_url, about_me)), user_info(email, user_name, avatar_url, about_me)',
      )
      .eq('id', postId)

    if (meId) {
      query = query.eq('like.user_id', meId)
    }
    query = query.single()

    const { data, error } = await query
    this.handleError(error)
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
      .select<
        string,
        ISupabasePost
      >('*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), user_info(email, user_name, avatar_url, about_me)')
      .gte('created_at', startOfDay)
      .lte('created_at', endOfDay)
      .eq('user_id', authorId)
      .eq('like.user_id', authorId)
      .order('created_at', { ascending: false })

    if (meId) {
      query = query.eq('like.user_id', meId)
    }

    const { data, error } = await query
    this.handleError(error)
    const isMe = this.isCurrentUserAuthor(authorId, meId)
    return this.filterPrivatePosts(data, isMe)
  }

  async getAllUserPosts({
    limit,
    authorId,
    postType,
    pageParam,
    meId,
  }: IGetAllUserPosts): Promise<ISupabasePost[]> {
    let query: any = this.supabase
      .from('post')
      .select(
        '*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), user_info(email, user_name, avatar_url, about_me)',
      )
      .eq('user_id', authorId)
      .eq('post_type', postType)
      .order('created_at', { ascending: false })
      .range(pageParam, pageParam + limit - 1)

    if (meId) {
      query = query.eq('like.user_id', meId)
    }

    const { data, error } = await query
    this.handleError(error)
    const isMe = this.isCurrentUserAuthor(authorId, meId)
    return this.filterPrivatePosts(data, isMe)
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

  private handleError(error: PostgrestError | null) {
    if (error?.code && error?.message) {
      throw new APIError(error.code, error.message, error)
    }
  }

  private isCurrentUserAuthor(authorId: string, meId?: string | null): boolean {
    return authorId === meId
  }

  private filterPrivateLikedPosts(
    data: ISupabaseLikedPost[] | null,
    isMe: boolean,
  ): ISupabaseLikedPost[] {
    if (!data) {
      return []
    }
    return isMe
      ? data
      : data?.map((item) =>
          item.post.access_type === AccessType.PUBLIC
            ? item
            : { ...item, post: { ...item.post, title: null, content: '' } },
        )
  }

  private filterPrivatePosts(
    data: ISupabasePost[] | null,
    isMe: boolean,
  ): ISupabasePost[] {
    if (!data) {
      return []
    }
    return isMe
      ? data
      : data?.map((item) =>
          item.access_type === AccessType.PUBLIC
            ? item
            : { ...item, title: null, content: '' },
        )
  }
}

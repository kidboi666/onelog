import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { AccessType } from '@/src/types/enums'
import {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  ILikedPost,
  IPost,
  IPostBaseAdapter,
  ISupabasePost,
  IUpdatePost,
} from '@/src/types/post'
import { APIError } from '@/src/utils/fetcher'

export class SupabasePostAdapter implements IPostBaseAdapter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAllPosts(params: IGetAllPosts) {
    let query = this.supabase
      .from('post')
      .select<string, IPost>(
        '*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), user_info(email, user_name, avatar_url, about_me)',
      )
      .eq('access_type', AccessType.PUBLIC)
      .order('created_at', { ascending: false })
      .range(params.pageParam, params.pageParam + params.limit - 1)

    query = this.addUserFilter(query, undefined, params.meId)
    const { data, error } = await query
    this.handleError(error)

    return data ?? []
  }

  async getLikedPosts(params: IGetLikedPosts) {
    let query = this.supabase
      .from('like')
      .select<string, ILikedPost>(
        '*, post!like_post_id_fkey(*, comment_count:comment(count), liked_count:like(count), user_info(user_name, avatar_url, email, about_me))',
      )
      .order('created_at', { ascending: false })
      .range(params.pageParam, params.pageParam + params.limit - 1)

    query = this.addUserFilter(query, params.authorId, params.meId)
    const { data, error } = await query
    this.handleError(error)
    const isMe = this.isCurrentUserAuthor(params.authorId, params.meId)

    return this.filterPrivateLikedPosts(data, isMe)
  }

  async getPost(params: IGetPost) {
    let query: any = this.supabase
      .from('post')
      .select(
        '*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), comments:comment(*, user_info(email, user_name, avatar_url, about_me)), user_info(email, user_name, avatar_url, about_me)',
      )
      .eq('id', params.postId)

    query = this.addUserFilter(query, undefined, params.meId)
    query = query.single()
    const { data, error } = await query
    this.handleError(error)

    return data
  }

  async getUserPostThatDay(params: IGetUserPostsThatDay) {
    let query = this.supabase
      .from('post')
      .select<
        string,
        IPost
      >('*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), user_info(email, user_name, avatar_url, about_me)')
      .gte('created_at', params.startOfDay)
      .lte('created_at', params.endOfDay)
      .eq('like.user_id', params.authorId)
      .order('created_at', { ascending: false })

    query = this.addUserFilter(query, params.authorId, params.meId)
    const { data, error } = await query
    this.handleError(error)
    const isMe = this.isCurrentUserAuthor(params.authorId, params.meId)

    return this.filterPrivatePosts(data as ISupabasePost[], isMe)
  }

  async getAllUserPosts(params: IGetAllUserPosts) {
    let query = this.supabase
      .from('post')
      .select<string, IPost>(
        '*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), user_info(email, user_name, avatar_url, about_me)',
      )
      .eq('post_type', params.postType)
      .order('created_at', { ascending: false })
      .range(params.pageParam, params.pageParam + params.limit - 1)

    query = this.addUserFilter(query, params.authorId, params.meId)
    const { data, error } = await query
    this.handleError(error)
    const isMe = this.isCurrentUserAuthor(params.authorId, params.meId)

    return this.filterPrivatePosts(data as ISupabasePost[], isMe)
  }

  async createPost(params: ICreatePost) {
    const { error } = await this.supabase
      .from('post')
      .insert({
        ...params,
        emotion_level: params.emotionLevel,
        access_type: params.accessType,
        post_type: params.postType,
      })
      .select()
    this.handleError(error)
  }

  async deletePost(postId: number) {
    const { error } = await this.supabase.from('post').delete().eq('id', postId)
    this.handleError(error)
  }

  async updatePost(params: IUpdatePost) {
    const { error } = await this.supabase
      .from('post')
      .update({
        ...params,
        emotion_level: params.emotionLevel,
        access_type: params.accessType,
        post_type: params.postType,
      })
      .eq('id', params.id)
    this.handleError(error)
  }

  private addUserFilter(query: any, authorId?: string, meId?: string | null) {
    if (meId) {
      query = query.eq('like.user_id', meId)
    }
    query = query.eq('user_id', authorId)
    return query
  }

  private handleError(error: PostgrestError | null) {
    if (error?.code && error?.message) {
      throw new APIError(error.code, error.message, error)
    }
  }

  private isCurrentUserAuthor(authorId: string, meId?: string | null) {
    return authorId === meId
  }

  private filterPrivateLikedPosts(
    data: ILikedPost[] | null,
    isMe: boolean,
  ): ILikedPost[] {
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

  private filterPrivatePosts(data: ISupabasePost[], isMe: boolean): IPost[] {
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

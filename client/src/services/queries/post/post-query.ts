import { SupabaseClient } from '@supabase/supabase-js'
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import {
  AccessType,
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetMyUsedWords,
  IGetPost,
  IGetUsedWords,
  IGetUserPostsThatDay,
  IPost,
  IPostBaseAdapter,
  ISupabasePost,
  ISupabasePostDetail,
  PostType,
} from '@/src/types/post'
import { Tables } from '@/src/types/supabase'
import { createPostAdapter } from '@/src/utils/adapter'
import { APIError } from '@/src/utils/fetcher'

export const postQuery = {
  getAllPost: (supabase: SupabaseClient, limit: number, meId?: string | null) =>
    infiniteQueryOptions<IPost[], APIError, IPost[], string[], number>({
      queryKey: QUERY_KEY.POST.PUBLIC,
      queryFn: ({ pageParam = 0 }) => {
        const adapter = createPostAdapter(supabase)
        return adapter.getAllPosts({ pageParam, limit, meId })
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined
        }
        return allPages.length * limit
      },
    }),

  getPost: (supabase: SupabaseClient, postId: number, meId?: string | null) =>
    queryOptions<IPost, APIError>({
      queryKey: QUERY_KEY.POST.DETAIL(postId),
      queryFn: () => {
        const adapter = createPostAdapter(supabase)
        return adapter.getPost({ postId, meId })
      },
    }),

  getLikedPost: (
    supabase: SupabaseClient,
    authorId: string,
    limit: number,
    meId?: string | null,
  ) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEY.POST.LIKED(authorId, meId),
      queryFn: ({ pageParam = 0 }) => {
        const adapter = createPostAdapter(supabase)
        return adapter.getLikedPosts({ pageParam, limit, authorId, meId })
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined
        }
        return allPages.length * limit
      },
    }),

  getUserPostThatDay: (
    supabase: SupabaseClient,
    authorId: string,
    startOfDay: string | null,
    endOfDay: string | null,
    meId?: string,
  ) =>
    queryOptions({
      queryKey: QUERY_KEY.POST.THAT_DAY(startOfDay, endOfDay, authorId),
      queryFn: () => {
        const adapter = createPostAdapter(supabase)
        return adapter.getUserPostThatDay({
          authorId,
          startOfDay,
          endOfDay,
          meId,
        })
      },
      enabled: !!startOfDay && !!endOfDay,
    }),

  getAllUserPost: (
    supabase: SupabaseClient,
    authorId: string,
    postType: PostType,
    limit: number = 10,
    meId?: string | null,
  ) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEY.POST.POST_TYPE(postType, authorId),
      queryFn: async ({ pageParam = 0 }) => {
        const adapter = createPostAdapter(supabase)
        return adapter.getAllUserPosts({
          pageParam,
          authorId,
          postType,
          limit,
          meId,
        })
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined
        }
        return allPages.length * limit
      },
    }),

  getMyUsedWords: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'user_words'>>({
      queryKey: QUERY_KEY.WORD.USED(userId),
      queryFn: async () => {
        const adapter = createPostAdapter(supabase)
        return adapter.getMyUsedWords({ userId })
      },
    }),

  getUsedWords: (supabase: SupabaseClient, word: string, trigger: boolean) =>
    queryOptions<Tables<'word_dictionary'>>({
      queryKey: QUERY_KEY.WORD.DETAIL(word),
      queryFn: async () => {
        const adapter = createPostAdapter(supabase)
        return adapter.getUsedWords({ word })
      },
      enabled: trigger,
    }),
}

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

  async getMyUsedWords({ userId }: IGetMyUsedWords): Promise<any> {
    const { data, error } = await this.supabase
      .from('user_words')
      .select()
      .eq('user_id', userId)
      .single()

    if (error) {
      throw new APIError(error.code, error.message, error)
    }

    return data
  }

  async getUsedWords({ word }: IGetUsedWords): Promise<any> {
    const { data, error } = await this.supabase
      .from('word_dictionary')
      .select()
      .eq('word', word)
      .single()

    if (error) {
      throw new APIError(error.code, error.message, error)
    }

    return data
  }
}

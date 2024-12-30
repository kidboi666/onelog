import { SupabaseClient } from '@supabase/supabase-js'
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { AccessType, IPost, PostType } from '@/src/types/post'
import { Tables } from '@/src/types/supabase'

/**
 * TODO 대충 any 로 휘갈긴 타입핑 지정 @kidboi666
 */
export const postQuery = {
  getAllPost: (supabase: SupabaseClient, limit: number, meId?: string | null) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEY.POST.PUBLIC,
      queryFn: async ({ pageParam = 0 }) => {
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
          .eq('access_type', AccessType.Public)
          .order('created_at', { ascending: false })
          .range(pageParam, pageParam + limit - 1)

        if (meId) {
          query = query.eq('like.user_id', meId)
        }

        const { data } = await query

        return data
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) return undefined // 마지막 페이지에 도달하면 undefined 반환
        return allPages.length * limit // 다음 페이지의 offset 반환
      },
    }),

  getPost: (supabase: SupabaseClient, postId: number, meId?: string | null) =>
    queryOptions<IPost>({
      queryKey: QUERY_KEY.POST.DETAIL(postId),
      queryFn: async () => {
        /**
         * 필요 이상으로 복잡한 타입핑 때문에 any
         */
        let query: any = supabase
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
                avatar_url
              )
            ),
            user_info(
              email,
              user_name,
              avatar_url,
              about_me
            )
            `,
          )
          .eq('id', postId)

        if (meId) {
          query = query.eq('like.user_id', meId)
        }
        query = query.single()

        const { data, error } = await query

        if (error) {
          console.error(error)
        }

        return data
      },
    }),

  /**
   * TODO is_liked 프로퍼티 구현 요망 (join 쿼리 추가해야 함) @kidboi666
   */
  getLikedPost: (supabase: SupabaseClient, userId: string, limit: number, meId?: string) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEY.POST.LIKED(userId, meId),
      queryFn: async ({ pageParam = 0 }) => {
        let query = supabase
          .from('like')
          .select(
            `
            *,
            post!like_post_id_fkey(
              *,
              comment_count:comment(count),
              liked_count:like(count),
              user_info(
                avatar_url,
                email,
                user_name
              )
            )
            `,
          )
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .range(pageParam, pageParam + limit - 1)

        const { data, error } = await query

        if (error) {
          console.error(error)
        }

        let publicData
        let isMe: boolean = false

        if (meId) {
          isMe = meId === userId
        }

        isMe
          ? (publicData = data)
          : (publicData = data?.map((item: any) =>
              item.post.access_type === AccessType.Public
                ? item
                : { ...item, post: { title: null, content: null } },
            ))

        return publicData
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) return undefined
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
      queryFn: async () => {
        let query = supabase
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
          console.error(error)
        }

        let publicData
        let isMe

        if (meId) {
          isMe = meId === authorId
        }

        isMe
          ? (publicData = data)
          : (publicData = data?.map((item) =>
              item.access_type === AccessType.Public
                ? item
                : { ...item, title: null, content: null },
            ))

        return publicData
      },
      enabled: !!startOfDay && !!endOfDay,
    }),

  getAllUserPost: (
    supabase: SupabaseClient,
    authorId: string,
    postType: PostType,
    limit: number = 10,
    meId?: string,
  ) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEY.POST.POST_TYPE(postType, authorId),
      queryFn: async ({ pageParam = 0 }) => {
        let query = supabase
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
          : (publicData = data?.map((item) =>
              item.access_type === AccessType.Public
                ? item
                : { ...item, content: null, title: null },
            ))

        return publicData
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) return undefined
        return allPages.length * limit
      },
    }),

  getMyUsedWords: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'user_words'>>({
      queryKey: QUERY_KEY.WORD.USED(userId),
      queryFn: async () => {
        const { data } = await supabase.from('user_words').select().eq('user_id', userId).single()

        return data
      },
    }),

  getUsedWords: (supabase: SupabaseClient, word: string, trigger: boolean) =>
    queryOptions<Tables<'word_dictionary'>>({
      queryKey: QUERY_KEY.WORD.DETAIL(word),
      queryFn: async () => {
        const { data } = await supabase.from('word_dictionary').select().eq('word', word).single()

        return data
      },
      enabled: trigger,
    }),
}

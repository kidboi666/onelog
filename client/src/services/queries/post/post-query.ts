import {
  getAllPosts,
  getLikedPosts,
  getPost,
  getUserPostsThatDay,
  getUserPosts,
} from '@/src/services/supabase/post'
import { QUERY_KEY } from '@/src/constants'
import { APIError } from '@/src/error'
import {
  InfiniteData,
  infiniteQueryOptions,
  queryOptions,
} from '@tanstack/react-query'
import { ILikedPost, IPost, IPostDetail } from '@/src/types/entities/post'
import { PostType } from '@/src/types/enums'

export const postQuery = {
  getAllPost: (limit: number, meId?: string | null) =>
    infiniteQueryOptions<
      IPost[],
      APIError,
      InfiniteData<IPost[]>,
      string[],
      number
    >({
      queryKey: QUERY_KEY.POST.PUBLIC,
      queryFn: ({ pageParam = 0 }) =>
        getAllPosts({ pageParam, limit, meId }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined
        }
        return allPages.length * limit
      },
    }),

  getLikedPost: (authorId: string, limit: number, meId?: string | null) =>
    infiniteQueryOptions<
      ILikedPost[],
      APIError,
      InfiniteData<ILikedPost[]>,
      (string | null | undefined)[],
      number
    >({
      queryKey: QUERY_KEY.POST.LIKED(authorId, meId),
      queryFn: ({ pageParam = 0 }) =>
        getLikedPosts({
          pageParam,
          limit,
          authorId,
          meId,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined
        }
        return allPages.length * limit
      },
    }),

  getPost: (postId: number, meId?: string | null) =>
    queryOptions<IPostDetail | null, APIError>({
      queryKey: QUERY_KEY.POST.DETAIL(postId),
      queryFn: () => getPost({ postId, meId }),
    }),

  getUserPostThatDay: (
    authorId: string,
    startOfDay: string | null,
    endOfDay: string | null,
    meId?: string,
  ) =>
    queryOptions<IPost[], APIError>({
      queryKey: QUERY_KEY.POST.THAT_DAY(startOfDay, endOfDay, authorId),
      queryFn: () =>
        getUserPostsThatDay({
          authorId,
          startOfDay,
          endOfDay,
          meId,
        }),
      enabled: !!startOfDay && !!endOfDay,
    }),

  getAllUserPost: (
    authorId: string,
    postType: PostType,
    limit: number,
    meId?: string | null,
  ) =>
    infiniteQueryOptions<
      IPost[],
      APIError,
      InfiniteData<IPost[]>,
      (string | null | undefined)[],
      number
    >({
      queryKey: QUERY_KEY.POST.POST_TYPE(postType, authorId),
      queryFn: async ({ pageParam = 0 }) =>
        getUserPosts({
          pageParam,
          authorId,
          postType,
          limit,
          meId,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined
        }
        return allPages.length * limit
      },
    }),
}

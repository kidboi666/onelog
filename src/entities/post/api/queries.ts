import {
  type InfiniteData,
  infiniteQueryOptions,
  queryOptions,
} from "@tanstack/react-query";
import {
  getAllPosts,
  getEmotionAverage,
  getLikedPosts,
  getPost,
  getUserPosts,
  getUserPostsThatDay,
} from "@/entities/post/api/post-api";
import { POST_QUERY_KEY } from "@/entities/post/model/constants";
import type {
  ILikedPost,
  IPost,
  IPostDetail,
} from "@/entities/post/model/types";
import type { APIError } from "@/shared/lib/errors/api-error";
import type { PostType } from "@/shared/types/enums";

export const postQuery = {
  getAllPost: (limit: number, meId?: string | null) =>
    infiniteQueryOptions<
      IPost[],
      APIError,
      InfiniteData<IPost[]>,
      string[],
      number
    >({
      queryKey: POST_QUERY_KEY.PUBLIC,
      queryFn: ({ pageParam = 0 }) => getAllPosts({ pageParam, limit, meId }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined;
        }
        return allPages.length * limit;
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
      queryKey: POST_QUERY_KEY.LIKED(authorId, meId),
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
          return undefined;
        }
        return allPages.length * limit;
      },
    }),

  getPost: (postId: number, meId?: string | null) =>
    queryOptions<IPostDetail | null, APIError>({
      queryKey: POST_QUERY_KEY.DETAIL(postId),
      queryFn: () => getPost({ postId, meId }),
    }),

  getUserPostThatDay: (
    authorId: string,
    startOfDay: string | null,
    endOfDay: string | null,
    meId?: string,
  ) =>
    queryOptions<IPost[], APIError>({
      queryKey: POST_QUERY_KEY.THAT_DAY(startOfDay, endOfDay, authorId),
      queryFn: () =>
        getUserPostsThatDay({
          authorId,
          startOfDay,
          endOfDay,
          meId,
        }),
      enabled: !!startOfDay && !!endOfDay,
    }),

  getUserPosts: (
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
      queryKey: POST_QUERY_KEY.POST_TYPE(postType, authorId),
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
          return undefined;
        }
        return allPages.length * limit;
      },
    }),

  getEmotionAverage: (userId: string) =>
    queryOptions({
      queryKey: ["user_emotion_average", userId],
      queryFn: () => getEmotionAverage(userId),
    }),
};

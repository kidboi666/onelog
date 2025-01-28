import { QUERY_KEY } from '@/src/constants/query-key'
import { dehydrate } from '@tanstack/react-query'
import { postCountQuery } from '@/src/services/queries/post/post-count-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { PostType } from '@/src/types/enums'
import { IPostDetail } from '@/src/types/post'
import { initClientForServer } from '@/src/utils/server-utils'

const prefetchPost = async (postId: number) => {
  const { queryClient, supabase } = initClientForServer()
  await queryClient.prefetchQuery(postQuery.getPost(supabase, postId))
  return queryClient
}

const prefetchPostCount = async (userId: string) => {
  const { queryClient, supabase } = initClientForServer()
  await queryClient.prefetchQuery(
    postCountQuery.countAllMyPost(supabase, userId),
  )
  return queryClient
}

const prefetchPostTypeCount = async (userId: string, postType: PostType) => {
  const { queryClient, supabase } = initClientForServer()
  await queryClient.prefetchQuery(
    postCountQuery.countAllPost(supabase, userId, postType),
  )
  return queryClient
}

const prefetchLikedPostCount = async (userId: string) => {
  const { queryClient, supabase } = initClientForServer()
  await queryClient.prefetchQuery(
    postCountQuery.countLikedPost(supabase, userId),
  )
  return queryClient
}

export const postPrefetchQuery = {
  metadata: async (postId: number): Promise<IPostDetail | undefined> => {
    const queryClient = await prefetchPost(postId)
    return queryClient.getQueryData<IPostDetail>(QUERY_KEY.POST.DETAIL(postId))
  },
  getPost: async (postId: number): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = await prefetchPost(postId)
    return dehydrate(queryClient)
  },
  countAllMyPost: async (
    userId: string,
  ): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = await prefetchPostCount(userId)
    return dehydrate(queryClient)
  },
  countAllPost: async (
    userId: string,
    postType: PostType,
  ): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = await prefetchPostTypeCount(userId, postType)
    return dehydrate(queryClient)
  },
  countLikedPost: async (
    userId: string,
  ): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = await prefetchLikedPostCount(userId)
    return dehydrate(queryClient)
  },
}

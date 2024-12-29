import { dehydrate } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import initClient from '@/src/services/queries/init-client'
import { postCountQuery } from '@/src/services/queries/post/post-count-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { IPost } from '@/src/types/post'

const prefetchPost = async (postId: number) => {
  const { queryClient, supabase } = initClient()
  await queryClient.prefetchQuery(postQuery.getPost(supabase, postId))
  return queryClient
}

const prefetchPostCount = async (userId: string) => {
  const { queryClient, supabase } = initClient()
  await queryClient.prefetchQuery(postCountQuery.countAllMyPost(supabase, userId))
  return queryClient
}

const prefetchPostTypeCount = async (userId: string, postType: 'journal' | 'article') => {
  const { queryClient, supabase } = initClient()
  await queryClient.prefetchQuery(postCountQuery.countAllPost(supabase, userId, postType))
  return queryClient
}

const prefetchLikedPostCount = async (userId: string) => {
  const { queryClient, supabase } = initClient()
  await queryClient.prefetchQuery(postCountQuery.countLikedPost(supabase, userId))
  return queryClient
}

export const postPrefetchQuery = {
  metadata: async (postId: number): Promise<IPost | undefined> => {
    const queryClient = await prefetchPost(postId)
    return queryClient.getQueryData<IPost>(QUERY_KEY.POST.DETAIL(postId))
  },
  getPost: async (postId: number): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = await prefetchPost(postId)
    return dehydrate(queryClient)
  },
  countAllMyPost: async (userId: string): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = await prefetchPostCount(userId)
    return dehydrate(queryClient)
  },
  countAllPost: async (
    userId: string,
    postType: 'journal' | 'article',
  ): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = await prefetchPostTypeCount(userId, postType)
    return dehydrate(queryClient)
  },
  countLikedPost: async (userId: string): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = await prefetchLikedPostCount(userId)
    return dehydrate(queryClient)
  },
}

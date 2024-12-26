import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { createServerClient } from '@/src/lib/supabase/server'
import { postQuery } from '@/src/services/queries/post/post-query'
import { IPostWithUserInfo } from '@/src/types/post'
import { dehydrate } from '@tanstack/react-query'
import { queryKey } from '@/src/lib/tanstack/query-key'

const prefetchPost = async (postId: number) => {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  await queryClient.prefetchQuery(postQuery.getPost(supabase, postId))
  return queryClient
}

export const postPrefetchQuery = {
  metadata: async (postId: number): Promise<IPostWithUserInfo | undefined> => {
    const queryClient = await prefetchPost(postId)
    return queryClient.getQueryData<IPostWithUserInfo>(
      queryKey.post.detail(postId),
    )
  },
  data: async (postId: number): Promise<ReturnType<typeof dehydrate>> => {
    const queryClient = await prefetchPost(postId)
    return dehydrate(queryClient)
  },
}

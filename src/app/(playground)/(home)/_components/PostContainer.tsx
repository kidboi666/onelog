'use client'

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { postQuery } from '@/src/services/queries/post/post-query'
import PostCard from './PostCard'
import useIntersect from '@/src/hooks/useIntersect'
import { useEffect } from 'react'
import Spinner from '@/src/components/Spinner'
import { YStack } from '@/src/components/Stack'
import { meQuery } from '@/src/services/queries/auth/me-query'

export default function PostContainer() {
  const limit = 4
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery(
      postQuery.getAllPost(supabase, limit, session?.userId),
    )
  const posts = data.pages.flatMap((page) => page || [])
  const [target, inView] = useIntersect<HTMLDivElement>()

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <YStack gap={12}>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} postUserInfo={post.user_info} />
      ))}
      <div ref={target} />
      {isFetching && (
        <Spinner.Container>
          <Spinner size={60} />
        </Spinner.Container>
      )}
    </YStack>
  )
}

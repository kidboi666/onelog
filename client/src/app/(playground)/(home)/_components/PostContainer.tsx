'use client'

import { PAGINATION } from '@/src/constants'
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import useIntersect from '@/src/hooks/useIntersect'
import Spinner from '@/src/components/Spinner'
import { YStack } from '@/src/components/Stack'
import PostCard from './PostCard'

export default function PostContainer() {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery(
      postQuery.getAllPost(supabase, PAGINATION.LIMIT, session?.id),
    )
  const posts = useMemo(
    () => data.pages.flatMap((page) => page || []) ?? [],
    [data],
  )
  const [target, inView] = useIntersect<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '50px',
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching])

  return (
    <YStack gap={12}>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} postUserInfo={post.userInfo} />
      ))}
      <div ref={target} className="h-4" />
      {isFetching && (
        <Spinner.Container>
          <Spinner size={60} />
        </Spinner.Container>
      )}
    </YStack>
  )
}

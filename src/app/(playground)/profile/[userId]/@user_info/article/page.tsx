'use client'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Lock, Loader2 } from 'lucide-react'
import { useMe } from '@/app/_store/use-me'
import { postQueries } from '@/entities/post/api/queries'
import { PostType } from '@/shared/types/enums'
import useIntersect from '@/hooks/useIntersect'
import { PostCard } from '@/app/(playground)/(home)/_components/PostCard'

interface Props {
  params: { userId: string }
}

export default function Article({ params: { userId } }: Props) {
  const limit = 4
  const { me } = useMe()
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading } =
    useSuspenseInfiniteQuery(
      postQueries.getUserPosts(userId, PostType.ARTICLE, limit, me?.id),
    )
  const articles = data?.pages.flatMap((article) => article) || []
  const [ref, inView] = useIntersect<HTMLDivElement>({}, isLoading)

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {articles && articles?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {articles?.map((article) =>
            article?.content ? (
              <PostCard key={article?.id} post={article} />
            ) : (
              <div
                key={article?.id}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-8"
              >
                <Lock className="size-5 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  비공개된 게시물 입니다.
                </p>
              </div>
            ),
          )}
          <div ref={ref} />
          {isFetching && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-12">
          <p className="text-muted-foreground">아직 작성한 아티클이 없습니다.</p>
        </div>
      )}
    </div>
  )
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'
import { Lock, Loader2, Trash2 } from 'lucide-react'
import { useMe } from '@/app/_store/use-me'
import { postQueries } from '@/entities/post/api/queries'
import { PostCard } from '@/widgets/post/ui'

interface Props {
  params: { userId: string }
  searchParams: { year: string; month: string; date: string }
}

export default function PrevOnePost({ params, searchParams }: Props) {
  const year = parseInt(searchParams.year)
  const month = parseInt(searchParams.month)
  const date = parseInt(searchParams.date)
  const { me } = useMe()
  const [startOfDay, setStartOfDay] = useState('')
  const [endOfDay, setEndOfDay] = useState('')

  const { data: posts, isFetching } = useQuery(
    postQueries.getUserPostThatDay(params.userId, startOfDay, endOfDay, me?.id),
  )

  useEffect(() => {
    if (year && month && date) {
      setStartOfDay(new Date(year, month - 1, date, 0, 0, 0).toISOString())
      setEndOfDay(new Date(year, month - 1, date, 23, 59, 59).toISOString())
    }
  }, [year, month, date])

  if (isFetching) {
    return (
      <div>
        <div className="flex flex-col gap-8">
          <h2 className="font-bold text-2xl">그날의 기록</h2>
          <h3 className="mb-4 text-muted-foreground text-sm">
            {`${month}월 ${date}일, ${year}`}
          </h3>
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </div>
    )
  }

  if (!year || !month || !date) {
    return (
      <div className="animate-fade-in">
        <div className="flex flex-col gap-8">
          <h2 className="font-bold text-2xl">그날의 기록</h2>
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-12 shadow-sm">
            <p className="text-muted-foreground">선택된 날이 없습니다.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <h2 className="font-bold text-2xl">그날의 기록</h2>
        <h3 className="mb-4 text-muted-foreground text-sm">
          {`${month}월 ${date}일, ${year}`}
        </h3>
        {posts && posts?.length >= 1 ? (
          <div className="flex flex-col gap-2">
            {posts?.map((post) => (
              <Fragment key={post.id}>
                {post.content ? (
                  <PostCard post={post} />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-8 shadow-sm">
                    <Lock className="size-5 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                      비공개된 게시물 입니다.
                    </p>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-12 shadow-sm">
            <Trash2 className="size-5 text-muted-foreground" />
            <p className="text-muted-foreground">삭제된 게시물 입니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}

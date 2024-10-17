'use client'

import { PropsWithChildren } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import cn from '@/lib/cn'
import LinkButton from '@/components/shared/LinkButton'

interface Props {
  params: { userId: string }
}

export default function Layout({ params, children }: PropsWithChildren<Props>) {
  const userId = params.userId
  const segment = useSelectedLayoutSegment()

  return (
    <div className="flex w-full flex-col gap-12 max-lg:px-4 lg:w-[768px]">
      <div className="flex gap-1 rounded-md bg-white p-1 shadow-md max-lg:px-1 dark:bg-var-darkgray">
        <LinkButton
          href={`/profile/${userId}/summary`}
          variant="list"
          size="sm"
          innerClassName={cn(
            'justify-center',
            segment === 'summary' ? 'bg-zinc-200 dark:bg-zinc-700' : '',
          )}
        >
          요약
        </LinkButton>
        <LinkButton
          href={`/profile/${userId}/sentence`}
          variant="list"
          size="sm"
          innerClassName={cn(
            'justify-center',
            segment === 'sentence' ? 'bg-zinc-200 dark:bg-zinc-700' : '',
          )}
        >
          한줄 한 눈에 보기
        </LinkButton>
      </div>
      {children}
    </div>
  )
}

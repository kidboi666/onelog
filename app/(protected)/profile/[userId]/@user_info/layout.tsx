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
      <div className="rounded-md bg-white p-1 shadow-md max-lg:px-1 dark:bg-var-darkgray">
        <div className="relative flex">
          <div
            className={cn(
              'pointer-events-none absolute h-full w-[calc(50%)] rounded-md bg-zinc-400/20 transition duration-300 ease-out dark:bg-zinc-600/40',
              segment === 'sentence' ? 'translate-x-full' : '',
            )}
          />
          <LinkButton
            href={`/profile/${userId}/summary`}
            variant="list"
            size="sm"
            innerClassName={cn('justify-center')}
          >
            요약
          </LinkButton>
          <LinkButton
            href={`/profile/${userId}/sentence`}
            variant="list"
            size="sm"
            innerClassName={cn('justify-center')}
          >
            한줄 한 눈에 보기
          </LinkButton>
        </div>
      </div>
      {children}
    </div>
  )
}

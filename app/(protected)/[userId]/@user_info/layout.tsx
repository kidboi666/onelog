'use client'

import { PropsWithChildren } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import cn from '@/lib/cn'
import LinkButton from '@/components/shared/LinkButton'
import Container from '@/components/shared/Container'

interface Props {
  params: { userId: string }
}

export default function Layout({ params, children }: PropsWithChildren<Props>) {
  const userId = params.userId
  const segment = useSelectedLayoutSegment()

  return (
    <Container>
      <Container isBackground className="flex-row gap-1 p-1 max-lg:px-1">
        <LinkButton
          href={`/${userId}/userinfo_summary`}
          variant="list"
          size="sm"
          innerClassName={cn(
            'justify-center',
            segment === 'userinfo_summary'
              ? 'bg-zinc-200 dark:bg-zinc-700'
              : '',
          )}
        >
          요약
        </LinkButton>
        <LinkButton
          href={`/${userId}/sentence_summary`}
          variant="list"
          size="sm"
          innerClassName={cn(
            'justify-center',
            segment === 'sentence_summary'
              ? 'bg-zinc-200 dark:bg-zinc-700'
              : '',
          )}
        >
          한줄 한 눈에 보기
        </LinkButton>
      </Container>
      {children}
    </Container>
  )
}

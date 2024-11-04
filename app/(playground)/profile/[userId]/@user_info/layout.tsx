'use client'

import { PropsWithChildren } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import cn from '@/lib/cn'
import LinkButton from '@/components/shared/LinkButton'
import { Container } from '@/components/shared/Container'
import { ZStack } from '@/components/shared/Stack'

interface Props {
  params: { userId: string }
}

export default function Layout({ params, children }: PropsWithChildren<Props>) {
  const userId = params.userId
  const segment = useSelectedLayoutSegment()

  return (
    <>
      <Container className="rounded-md bg-white p-1 shadow-md max-lg:px-1 dark:bg-var-darkgray">
        <ZStack>
          <div
            className={cn(
              'pointer-events-none absolute h-full w-[calc(50%)] rounded-md bg-zinc-400/10 transition duration-300 ease-out dark:bg-zinc-700/40',
              segment === 'sentence' ? 'translate-x-full' : '',
            )}
          />
          <LinkButton
            href={`/profile/${userId}/summary`}
            variant="list"
            size="sm"
            innerClassName="justify-center"
          >
            요약
          </LinkButton>
          <LinkButton
            href={`/profile/${userId}/sentence`}
            variant="list"
            size="sm"
            innerClassName="justify-center"
          >
            감정 한 눈에 보기
          </LinkButton>
        </ZStack>
      </Container>
      {children}
    </>
  )
}

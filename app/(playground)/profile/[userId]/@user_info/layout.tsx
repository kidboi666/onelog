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
      <Container>
        <ZStack gap={0}>
          <div
            className={cn(
              'pointer-events-none absolute -z-10 h-full w-[calc(50%)] rounded-md bg-white shadow-md transition duration-300 ease-out dark:bg-var-darkgray',
              segment === 'sentence' ? 'translate-x-full' : '',
            )}
          />
          <LinkButton
            href={`/profile/${userId}/summary`}
            variant="teritory"
            size="sm"
            innerClassName="justify-center"
          >
            요약
          </LinkButton>
          <LinkButton
            href={`/profile/${userId}/sentence`}
            variant="teritory"
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

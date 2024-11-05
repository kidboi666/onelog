'use client'

import { PropsWithChildren } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import cn from '@/lib/cn'
import LinkButton from '@/components/shared/LinkButton'
import { Container } from '@/components/shared/Container'
import { ZStack } from '@/components/shared/Stack'
import { PROFILE_NAVIGATE_MENUS } from '../_constants/Navigate'
import { useSuspenseQueries } from '@tanstack/react-query'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { supabase } from '@/lib/supabase/client'
import Text from '@/components/shared/Text'

interface Props {
  params: { userId: string }
}

export default function Layout({ params, children }: PropsWithChildren<Props>) {
  const userId = params.userId
  const segment = useSelectedLayoutSegment()
  const { data: counts } = useSuspenseQueries({
    queries: ['journal', 'article'].map((type: any) =>
      sentenceQuery.getAllSentenceCount(supabase, userId, type),
    ),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      }
    },
  })

  return (
    <>
      <Container className="rounded-md bg-white p-1 shadow-md dark:bg-var-darkgray">
        <ZStack gap={0}>
          {PROFILE_NAVIGATE_MENUS.map((menu) => (
            <LinkButton
              key={menu.id}
              href={`/profile/${userId}/${menu.path}`}
              variant="teritory"
              size="sm"
              innerClassName={cn(
                'justify-center rounded-md text-zinc-500 font-medium',
                segment === menu.path ? 'bg-zinc-200 dark:bg-var-dark' : '',
              )}
            >
              {menu.name}
              {counts.map(
                (data) =>
                  data.postType === menu.path && (
                    <Text type="caption" size="xs" className="ml-1">
                      {data.count}
                    </Text>
                  ),
              )}
            </LinkButton>
          ))}
        </ZStack>
      </Container>
      {children}
    </>
  )
}

'use client'

import { Fragment, PropsWithChildren } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useSuspenseQueries } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import cn from '@/lib/cn'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { PROFILE_NAVIGATE_MENUS } from '../_constants/Navigate'
import LinkButton from '@/components/shared/LinkButton'
import { Container } from '@/components/shared/Container'
import { ZStack } from '@/components/shared/Stack'
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
      <Container className="overflow-x-auto rounded-md bg-white p-1 shadow-sm dark:bg-var-darkgray">
        <ZStack gap={2}>
          {PROFILE_NAVIGATE_MENUS.map((menu, idx) => (
            <>
              <LinkButton
                key={menu.id}
                href={`/profile/${userId}/${menu.path}`}
                variant="teritory"
                size="sm"
                innerClassName={cn(
                  'justify-center rounded-md text-zinc-500 font-medium ',
                  segment === menu.path && 'bg-zinc-100 dark:bg-var-dark',
                )}
              >
                {menu.name}
                {counts.map(
                  (data) =>
                    data.postType === menu.path && (
                      <Fragment key={data.postType}>
                        <Text type="caption" size="xs" className="ml-1">
                          {data.count}
                        </Text>
                      </Fragment>
                    ),
                )}
              </LinkButton>
              {PROFILE_NAVIGATE_MENUS.length === idx + 1 ? null : (
                <div
                  className={cn(
                    'my-auto h-3 border-r border-zinc-200 dark:border-zinc-600',
                  )}
                />
              )}
            </>
          ))}
        </ZStack>
      </Container>
      {children}
    </>
  )
}

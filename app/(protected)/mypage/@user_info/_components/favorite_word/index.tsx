'use client'

import { useMemo } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Empty from '@/components/shared/Empty'
import Title from '@/components/shared/Title'
import Tag from './_components/Tag'

export default function FavoriteWords() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: words } = useSuspenseQuery(
    sentenceQuery.getMyUsedWords(supabase, me.userId),
  )
  const sortedUsedWords = useMemo(
    () => words?.words?.sort((a, b) => b.count - a.count),
    [words?.words],
  )
  const shouldRenderWords = useMemo(
    () => sortedUsedWords?.filter((word) => word.count > 1),
    [sortedUsedWords],
  )

  return (
    <Container className="flex flex-col gap-4">
      <Title>가장 많이 사용하는</Title>
      {shouldRenderWords?.length! >= 1 ? (
        <Box isBackground isRounded className="flex flex-wrap gap-2 p-4">
          {shouldRenderWords?.map((word) => (
            <Tag key={word.word} word={word} />
          ))}
        </Box>
      ) : (
        <Empty>아직 자주 사용하는 단어가 없습니다.</Empty>
      )}
    </Container>
  )
}

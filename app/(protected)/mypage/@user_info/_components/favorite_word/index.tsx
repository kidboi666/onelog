'use client'

import { useMemo } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import Empty from '@/components/shared/Empty'
import Title from '@/components/shared/Title'
import Tag from './_components/Tag'

export default function FavoriteWords() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: words } = useSuspenseQuery(
    sentenceQuery.getMyUsedWords(supabase, me?.userId),
  )
  const sortedUsedWords = useMemo(
    () => words?.words?.sort((a, b) => b?.count - a?.count),
    [words?.words],
  )
  const shouldRenderWords = useMemo(
    () => sortedUsedWords?.filter((word) => word.count > 1),
    [sortedUsedWords],
  )

  return (
    <div className="flex flex-col gap-4">
      <Title>가장 많이 사용하는</Title>
      {shouldRenderWords?.length! >= 1 ? (
        <div className="flex flex-wrap gap-2 rounded-md bg-white p-4 dark:bg-var-darkgray">
          {shouldRenderWords?.map((word) => (
            <Tag key={word.word} word={word} />
          ))}
        </div>
      ) : (
        <Empty>아직 자주 사용하는 단어가 없습니다.</Empty>
      )}
    </div>
  )
}

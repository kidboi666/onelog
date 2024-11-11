'use client'

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import SentenceCard from '../_components/SentenceCard'
import useIntersect from '@/hooks/useIntersect'
import { useEffect } from 'react'
import Spinner from '@/components/shared/Spinner'
import { YStack } from '@/components/shared/Stack'

export default function SentenceContainer() {
  const limit = 4
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery(sentenceQuery.getAllSentence(supabase, limit))
  const sentences = data.pages.flatMap((page) => page || [])
  const [target, inView] = useIntersect<HTMLDivElement>()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <YStack gap={12}>
      {sentences?.map((sentence) => (
        <SentenceCard
          key={sentence.id}
          sentence={sentence}
          sentenceUserInfo={sentence.user_info}
          meId={me !== null ? me.userId : null}
        />
      ))}
      <div ref={target} />
      {isFetching && (
        <Spinner.Container>
          <Spinner size={60} />
        </Spinner.Container>
      )}
    </YStack>
  )
}

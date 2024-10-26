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

export default function SentenceContainer() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const limit = 10
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(sentenceQuery.getAllSentence(supabase, limit))
  const sentences = data.pages.flatMap((page) => page || [])
  const [target, inView] = useIntersect<HTMLDivElement>()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className="flex flex-col gap-8">
      {sentences?.map((sentence) => (
        <SentenceCard
          key={sentence.id}
          sentence={sentence}
          userId={me !== null ? me.userId : null}
        />
      ))}
      <div ref={target} />
      {isFetchingNextPage && <Spinner size={60} />}
    </div>
  )
}

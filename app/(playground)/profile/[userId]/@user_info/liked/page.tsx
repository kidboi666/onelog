'use client'

import { useEffect } from 'react'
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import useIntersect from '@/hooks/useIntersect'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import SentenceCard from '@/app/(playground)/home/_components/SentenceCard'
import { Container } from '@/components/shared/Container'
import Empty from '@/components/shared/Empty'
import Spinner from '@/components/shared/Spinner'
import { YStack } from '@/components/shared/Stack'
import Title from '@/components/shared/Title'

interface Props {
  params: { userId: string }
}

export default function LikedPage({ params }: Props) {
  const limit = 4
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useSuspenseInfiniteQuery(
      sentenceQuery.getLikedSentence(supabase, params.userId, limit),
    )
  const likedSentences = data.pages.flatMap((sentence) => sentence || [])
  const [ref, inView] = useIntersect<HTMLDivElement>()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <Container>
      {likedSentences.length > 0 ? (
        <YStack gap={8}>
          <Title></Title>
          {likedSentences?.map((data) => (
            <SentenceCard
              key={data.id}
              meId={me?.userId}
              sentence={data.sentence}
              createdAtLiked={data.created_at}
              sentenceUserInfo={data.sentence.user_info}
            />
          ))}
          <div ref={ref} />
          {isFetching && (
            <Spinner.Container>
              <Spinner size={60} />
            </Spinner.Container>
          )}
        </YStack>
      ) : (
        <Empty>
          <Empty.Text>좋아요 한 게시글이 없습니다.</Empty.Text>
        </Empty>
      )}
    </Container>
  )
}

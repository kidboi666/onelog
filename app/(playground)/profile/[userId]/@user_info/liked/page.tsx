'use client'

import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import useIntersect from '@/hooks/useIntersect'
import useMe from '@/hooks/useMe'

import SentenceCard from '@/app/(playground)/home/_components/SentenceCard'
import { Container } from '@/components/shared/Container'
import Empty from '@/components/shared/Empty'
import Spinner from '@/components/shared/Spinner'
import { YStack } from '@/components/shared/Stack'

interface Props {
  params: { userId: string }
}

export default function LikedPage({ params }: Props) {
  const limit = 4
  const { me, session } = useMe()
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    sentenceQuery.getLikedSentence(supabase, params.userId, limit),
  )
  const likedSentences = data?.pages.flatMap((sentence) => sentence || [])
  const [ref, inView] = useIntersect<HTMLDivElement>()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <Container className="animate-fade-in">
      {likedSentences && likedSentences?.length > 0 ? (
        <YStack gap={8}>
          {likedSentences?.map((sentence) =>
            sentence?.content ? (
              <SentenceCard
                key={sentence.id}
                meId={me?.id}
                session={session}
                sentence={sentence.sentence}
                createdAtLiked={sentence.created_at}
                sentenceUserInfo={sentence.sentence.user_info}
              />
            ) : (
              <Empty key={sentence?.id}>
                <Empty.Icon view="0 -960 960 960" size={20}>
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                </Empty.Icon>
                <Empty.Text>비공개된 게시물 입니다.</Empty.Text>
              </Empty>
            ),
          )}
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

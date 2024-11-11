'use client'

import Title from '@/components/shared/Title'
import Empty from '@/components/shared/Empty'
import SentenceCard from '@/app/(playground)/home/_components/SentenceCard'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { supabase } from '@/lib/supabase/client'
import { YStack } from '@/components/shared/Stack'
import Spinner from '@/components/shared/Spinner'
import { useEffect, useState } from 'react'
import { Container } from '@/components/shared/Container'
import useMe from '@/hooks/useMe'

interface Props {
  params: { userId: string }
  searchParams: { year: string; month: string; date: string }
}

export default function PrevOneSentence({ params, searchParams }: Props) {
  const year = parseInt(searchParams.year)
  const month = parseInt(searchParams.month)
  const date = parseInt(searchParams.date)
  const { me, session } = useMe()
  const isMe = session?.userId === params.userId
  const [startOfDay, setStartOfDay] = useState('')
  const [endOfDay, setEndOfDay] = useState('')

  const { data: sentences, isFetching } = useQuery(
    sentenceQuery.getUserSentenceThatDay(
      supabase,
      params.userId,
      startOfDay,
      endOfDay,
      isMe,
    ),
  )

  useEffect(() => {
    if (year && month && date) {
      setStartOfDay(new Date(year, month - 1, date, 0, 0, 0).toISOString())
      setEndOfDay(new Date(year, month - 1, date, 23, 59, 59).toISOString())
    }
  }, [year, month, date])

  if (isFetching) {
    return (
      <Spinner.Container>
        <Spinner size={60} />
      </Spinner.Container>
    )
  }

  if (!year || !month || !date) {
    return (
      <Container className="animate-fade-in">
        <YStack gap={8}>
          <Title>그날의 기록</Title>
          <Empty>
            <Empty.Text>선택된 날이 없습니다.</Empty.Text>
          </Empty>
        </YStack>
      </Container>
    )
  }

  return (
    <Container className="animate-fade-in">
      <YStack gap={8}>
        <Title>그날의 기록</Title>
        <Title type="sub" size="sm" className="mb-4">
          {`${month}월 ${date}일, ${year}`}
        </Title>
        {sentences && sentences?.length >= 1 ? (
          <>
            <YStack gap={8}>
              {sentences?.map((sentence) =>
                sentence.content ? (
                  <SentenceCard
                    session={session}
                    key={sentence?.id}
                    sentence={sentence}
                    sentenceUserInfo={sentence?.user_info}
                    meId={me?.id}
                  />
                ) : (
                  <Empty key={sentence.id}>
                    <Empty.Icon view="0 -960 960 960" size={20}>
                      <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                    </Empty.Icon>
                    <Empty.Text>비공개된 게시물 입니다.</Empty.Text>
                  </Empty>
                ),
              )}
            </YStack>
          </>
        ) : (
          <Empty>
            <Empty.Text>작성된 내용이 없습니다.</Empty.Text>
            <Empty.Text>게시물이 삭제되거나 없는 상태 입니다.</Empty.Text>
          </Empty>
        )}
      </YStack>
    </Container>
  )
}

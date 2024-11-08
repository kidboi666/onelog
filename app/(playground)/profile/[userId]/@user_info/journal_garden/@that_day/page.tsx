'use client'

import { usePathname } from 'next/navigation'
import Title from '@/components/shared/Title'
import Empty from '@/components/shared/Empty'
import SentenceCard from '@/app/(playground)/home/_components/SentenceCard'
import { useSuspenseQuery } from '@tanstack/react-query'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { supabase } from '@/lib/supabase/client'
import { YStack } from '@/components/shared/Stack'
import Spinner from '@/components/shared/Spinner'
import { useEffect, useState } from 'react'

interface Props {
  searchParams: { year: string; month: string; date: string }
}

export default function PrevOneSentence({ searchParams }: Props) {
  const pathname = usePathname()
  const [_, __, meId] = pathname.split('/')
  const year = parseInt(searchParams.year)
  const month = parseInt(searchParams.month)
  const date = parseInt(searchParams.date)
  const [startOfDay, setStartOfDay] = useState('')
  const [endOfDay, setEndOfDay] = useState('')
  const { data: sentences, isFetching } = useSuspenseQuery(
    sentenceQuery.getMySentenceThatDay(supabase, meId, startOfDay, endOfDay),
  )

  useEffect(() => {
    if (year && month && date) {
      setStartOfDay(new Date(year, month - 1, date, 0, 0, 0).toISOString())
      setEndOfDay(new Date(year, month - 1, date, 23, 59, 59).toISOString())
    }
  }, [year, month, date])
  return (
    <>
      <Title>그날의 기록</Title>
      <Title type="sub" size="sm" className="mb-4">
        {`${month}월 ${date}일, ${year}`}
      </Title>
      {sentences && sentences?.length >= 1 ? (
        <>
          {isFetching && <Spinner size={60} />}
          <YStack gap={8}>
            {sentences?.map((sentence) => (
              <SentenceCard
                key={sentence.id}
                sentence={sentence}
                sentenceUserInfo={sentence.user_info}
                meId={meId}
              />
            ))}
          </YStack>
        </>
      ) : (
        <Empty>
          <Empty.Text>작성된 내용이 없습니다.</Empty.Text>
          <Empty.Text>게시물이 삭제되거나 없는 상태 입니다.</Empty.Text>
        </Empty>
      )}
    </>
  )
}

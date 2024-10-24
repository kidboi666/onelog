'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useSentence } from '@/store/useSentence'
import Title from '@/components/shared/Title'
import { List } from '@/components/shared/List'
import Empty from '@/components/shared/Empty'
import { formatDateToMDY } from '@/utils/formatDate'
import SentenceCard from '@/app/(playground)/home/_components/SentenceCard'
import { useSuspenseQuery } from '@tanstack/react-query'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { supabase } from '@/lib/supabase/client'

export default function PrevOneSentence() {
  const pathname = usePathname()
  const [_, __, userId] = pathname.split('/')
  const { sentences: sentenceList, setSentences } = useSentence()
  const { data: sentences } = useSuspenseQuery(
    sentenceQuery.getMySentenceThatDay(
      supabase,
      userId,
      sentenceList?.[0].created_at || null,
    ),
  )
  console.log(sentenceList)

  useEffect(() => {
    setSentences(null)
  }, [])

  return (
    <>
      <Title>그날의 기록</Title>
      {sentences && sentences?.length >= 1 ? (
        <List className="flex flex-col gap-4">
          <Title type="sub" size="sm" className="mb-4">
            {formatDateToMDY(sentences[0]?.created_at)}
          </Title>
          {sentences?.map((sentence) => (
            <SentenceCard
              key={sentence.id}
              sentence={sentence}
              userId={userId}
            />
          ))}
        </List>
      ) : (
        <Empty>작성된 내용이 없습니다.</Empty>
      )}
    </>
  )
}

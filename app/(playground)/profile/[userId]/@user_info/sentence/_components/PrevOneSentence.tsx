'use client'

import { usePathname, useSearchParams } from 'next/navigation'
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
  const [_, __, meId] = pathname.split('/')
  const searchParams = useSearchParams()
  const year = Number(searchParams.get('year'))
  const month = Number(searchParams.get('month'))
  const date = Number(searchParams.get('date'))
  let startOfDay = null
  let endOfDay = null
  if (year && month && date) {
    startOfDay = new Date(year, month, date, 0, 0, 0).toISOString() || null
    endOfDay = new Date(year, month, date, 23, 59, 59).toISOString() || null
  }
  const { data: sentences } = useSuspenseQuery(
    sentenceQuery.getMySentenceThatDay(supabase, meId, startOfDay, endOfDay),
  )

  return (
    <>
      <Title>그날의 기록</Title>
      {sentences && sentences?.length >= 1 ? (
        <List className="flex flex-col gap-4">
          <Title type="sub" size="sm" className="mb-4">
            {formatDateToMDY(sentences[0]?.created_at)}
          </Title>
          {sentences?.map((sentence) => (
            <SentenceCard key={sentence.id} sentence={sentence} meId={meId} />
          ))}
        </List>
      ) : (
        <Empty>작성된 내용이 없습니다.</Empty>
      )}
    </>
  )
}

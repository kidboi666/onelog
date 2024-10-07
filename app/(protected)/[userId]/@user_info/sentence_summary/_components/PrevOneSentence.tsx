'use client'

import { useSentence } from '@/store/useSentence'
import Title from '@/components/shared/Title'
import { List } from '@/components/shared/List'
import Empty from '@/components/shared/Empty'
import { formatDateToMDY } from '@/utils/formatDate'
import SentenceItem from '@/components/feature/sentence/sentence/SentenceItem'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function PrevOneSentence() {
  const pathname = usePathname()
  const [_, userId] = pathname.split('/')
  const { sentences, setSentences } = useSentence()

  useEffect(() => {
    setSentences(null)
  }, [])

  return (
    <>
      <Title>그날의 한 문장</Title>
      {sentences ? (
        <List className="flex flex-col gap-4 p-4">
          <Title type="sub" size="sm" className="mb-4">
            {formatDateToMDY(sentences[0].created_at)}
          </Title>
          {sentences?.map((item) => (
            <SentenceItem
              key={item.id}
              sentenceSummary={item}
              userId={userId}
              isMyPage
            />
          ))}
        </List>
      ) : (
        <Empty>작성된 내용이 없습니다.</Empty>
      )}
    </>
  )
}

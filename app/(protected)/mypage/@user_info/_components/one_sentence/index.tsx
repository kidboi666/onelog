'use client'

import { useSentence } from '@/store/useSentence'
import Title from '@/components/shared/Title'
import SentenceItem from './SentenceItem'
import { List } from '@/components/shared/List'
import Empty from '@/components/shared/Empty'
import { formatDateToMDY } from '@/utils/formatDate'

export default function PrevOneSentence() {
  const { sentences } = useSentence()

  return (
    <div className="flex flex-col gap-4">
      <Title>그날의 한 문장</Title>
      {sentences ? (
        <List isRounded isBackground className="flex flex-col p-4">
          <Title type="sub" size="sm" className="mb-4">
            {formatDateToMDY(sentences[0].created_at)}
          </Title>
          {sentences?.map((item) => (
            <SentenceItem key={item.id} sentence={item} />
          ))}
        </List>
      ) : (
        <Empty>작성된 내용이 없습니다.</Empty>
      )}
    </div>
  )
}

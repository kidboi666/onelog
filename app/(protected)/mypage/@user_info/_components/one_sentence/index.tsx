'use client'

import { useSentence } from '@/store/useSentence'
import Title from '@/components/shared/Title'
import SentenceItem from './SentenceItem'
import { List } from '@/components/shared/List'
import Container from '@/components/shared/Container'
import Empty from '@/components/shared/Empty'

export default function PrevOneSentence() {
  const { sentences } = useSentence()

  return (
    <Container className="flex flex-col gap-4">
      <Title>그날의 한 문장</Title>
      {sentences ? (
        <List isRounded isBackground className="flex flex-col p-4">
          {sentences?.map((item) => (
            <SentenceItem key={item.id} sentence={item} />
          ))}
        </List>
      ) : (
        <Empty>작성된 내용이 없습니다.</Empty>
      )}
    </Container>
  )
}

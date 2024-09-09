'use client'

import { useSentence } from '@/store/useSentence'
import Title from '@/components/shared/Title'
import PrevOneSentenceItem from './PrevOneSentenceItem'
import { List } from '@/components/shared/List'
import Container from '@/components/shared/Container'
import Empty from '@/components/shared/Empty'

export default function PrevOneSentence() {
  const { sentences } = useSentence()

  return (
    <Container className="flex flex-col gap-4">
      <Title>그날의 한 문장</Title>
      <List className="flex flex-col">
        {sentences ? (
          sentences?.map((item) => (
            <PrevOneSentenceItem key={item.id} sentence={item} />
          ))
        ) : (
          <Empty>작성된 내용이 없습니다.</Empty>
        )}
      </List>
    </Container>
  )
}

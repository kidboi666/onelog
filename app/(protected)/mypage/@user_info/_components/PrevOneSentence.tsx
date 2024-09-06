'use client'

import { useSentence } from '@/store/useSentence'
import Title from '@/components/shared/Title'
import PrevOneSentenceItem from './PrevOneSentenceItem'
import { List } from '@/components/shared/List'
import Container from '@/components/shared/Container'

export default function PrevOneSentence() {
  const { sentences } = useSentence()

  return (
    <Container className="flex flex-col gap-4">
      <Title>그날의 한 문장</Title>
      <List className="flex flex-col">
        {sentences?.map((item) => (
          <PrevOneSentenceItem key={item.id} sentence={item} />
        ))}
      </List>
    </Container>
  )
}

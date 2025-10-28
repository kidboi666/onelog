'use client'

import { ITodo } from '@/src/types/entities/todo'
import TextDisplay from '@/src/components/TextDisplay'
import Title from '@/src/components/Title'

interface Props {
  todo: ITodo
}

export default function IsCompleteSection({ todo }: Props) {
  return (
    <>
      <Title size="xs">완료 상태</Title>
      <TextDisplay>{todo.isComplete ? '완료' : '미완료'}</TextDisplay>
    </>
  )
}

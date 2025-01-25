'use client'

import { Tables } from '@/src/types/supabase'
import TextDisplay from '@/src/components/TextDisplay'
import Title from '@/src/components/Title'

interface Props {
  todo?: Tables<'todo'>
}

export default function IsCompleteSection({ todo }: Props) {
  return (
    <>
      <Title size="xs">완료 상태</Title>
      <TextDisplay>{todo?.is_complete ? '완료' : '미완료'}</TextDisplay>
    </>
  )
}

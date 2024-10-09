'use client'

import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { Tables } from '@/types/supabase'

interface Props {
  todo?: Tables<'todo'>
}

export default function IsCompleteSection({ todo }: Props) {
  return (
    <>
      <Title size="xs">완료 상태</Title>
      <Text>{todo?.is_complete ? '완료' : '미완료'}</Text>
    </>
  )
}

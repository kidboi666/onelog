'use client'

import Text from '@/src/components/shared/Text'
import Title from '@/src/components/shared/Title'
import { Tables } from '@/src/types/supabase'
import { formatDateToHM, formatDateToMDY } from '@/src/utils/formatDate'

interface Props {
  todo?: Tables<'todo'>
}

export default function DateSection({ todo }: Props) {
  return (
    <>
      <Title size="xs">등록일</Title>
      <Text>
        {formatDateToMDY(todo?.created_at!)}년{' '}
        {formatDateToHM(todo?.created_at!)}
      </Text>
    </>
  )
}

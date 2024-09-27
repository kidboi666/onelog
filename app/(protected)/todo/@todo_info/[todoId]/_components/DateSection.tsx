'use client'

import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { formatDateToHM, formatDateToMDY } from '@/utils/formatDate'
import { useSuspenseQuery } from '@tanstack/react-query'

interface Props {
  todoId: string
  folderId: string
}

export default function DateSection({ todoId, folderId }: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me.userId, Number(folderId)),
  )
  const todo = todos?.find((item) => item.id === Number(todoId))

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

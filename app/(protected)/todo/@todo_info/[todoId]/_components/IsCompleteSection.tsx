'use client'

import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { useSuspenseQuery } from '@tanstack/react-query'

interface Props {
  todoId: string
  folderId: string
}

export default function IsCompleteSection({ todoId, folderId }: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me.userId, Number(folderId)),
  )
  const todo = todos?.find((item) => item.id === Number(todoId))
  return (
    <>
      <Title size="xs">완료 상태</Title>
      <Text>{todo?.is_complete ? '완료' : '미완료'}</Text>
    </>
  )
}

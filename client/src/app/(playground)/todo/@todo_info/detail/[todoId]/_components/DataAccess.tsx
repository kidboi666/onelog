'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { todoQuery } from '@/src/services/queries/todo/todo-query'
import Line from '@/src/components/Line'
import ButtonSection from './ButtonSection'
import DateSection from './DateSection'
import IsCompleteSection from './IsCompleteSection'
import MemoSection from './MemoSection'
import TitleSection from './TitleSection'

interface Props {
  todoId: string
  folderId: string
  orderFrom: 'main' | 'folder'
  color: string
}

export default function DataAccess({ todoId, folderId, orderFrom, color }: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me!.userId, Number(folderId)),
  )
  const todo = todos ? todos?.find((item) => item.id === Number(todoId)) : null

  if (!todo) return null

  return (
    <>
      <TitleSection todo={todo} />
      <div className="flex flex-1 flex-col gap-4">
        <Line />
        <DateSection todo={todo} />
        <Line />
        <MemoSection todo={todo} />
        <Line />
        <IsCompleteSection todo={todo} />
      </div>
      <ButtonSection
        todoId={todoId}
        folderId={folderId}
        todo={todo}
        orderFrom={orderFrom}
        color={color}
      />
    </>
  )
}

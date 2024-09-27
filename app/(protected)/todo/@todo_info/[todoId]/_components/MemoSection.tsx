'use client'

import Button from '@/components/shared/Button'
import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import { useInput } from '@/hooks/useInput'
import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import useUpdateTodo from '@/services/mutates/todo/useUpdateTodo'
import { meQuery } from '@/services/queries/auth/meQuery'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { FormEvent, useEffect } from 'react'

interface Props {
  todoId: string
  folderId: string
}

export default function MemoSection({ todoId, folderId }: Props) {
  const queryClient = getQueryClient()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me.userId, Number(folderId)),
  )
  const todo = todos?.find((item) => item.id === Number(todoId))

  const [memo, onChangeMemo, setMemo] = useInput<string>('')

  const { mutate: updateTodo } = useUpdateTodo()

  const handleSubmitMemo = (e: FormEvent) => {
    e.preventDefault()
    updateTodo(
      { ...todo!, memo, updated_at: new Date().toISOString() },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo', 'in_progress'] })
        },
      },
    )
  }

  useEffect(() => {
    setMemo(todo?.memo ?? '')
  }, [todo])

  return (
    <form onSubmit={handleSubmitMemo} className="flex flex-col gap-4">
      <Title size="xs">메모</Title>
      <TextArea
        value={memo}
        onChange={onChangeMemo}
        placeholder="메모를 입력하세요."
        className="p-2 ring-1 ring-zinc-200 dark:ring-zinc-600"
      />
      <Button
        variant="secondary"
        type="submit"
        disabled={!memo || memo === todo?.memo}
        className="self-end"
      >
        메모 추가
      </Button>
    </form>
  )
}

'use client'

import { QUERY_KEY } from '@/src/constants/index'
import { FormEvent, useEffect } from 'react'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import useUpdateTodo from '@/src/services/mutates/todo/useUpdateTodo'
import { ITodo } from '@/src/types/entities/todo'
import useInput from '@/src/hooks/useInput'
import Button from '@/src/components/Button'
import TextArea from '@/src/components/TextArea'
import Title from '@/src/components/Title'

interface Props {
  todo: ITodo
}

export default function MemoSection({ todo }: Props) {
  const queryClient = getQueryClient()
  const [memo, onChangeMemo, setMemo] = useInput<string>('')

  const { mutate: updateTodo } = useUpdateTodo()

  const handleSubmitMemo = (e: FormEvent) => {
    e.preventDefault()
    updateTodo(
      { ...todo, memo },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: QUERY_KEY.TODO.IN_PROGRESS,
          })
        },
      },
    )
  }

  useEffect(() => {
    setMemo(todo.memo)
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

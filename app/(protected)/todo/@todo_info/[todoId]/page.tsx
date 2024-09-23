'use client'

import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import Line from '@/components/shared/Line'
import Text from '@/components/shared/Text'
import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import { useInput } from '@/hooks/useInput'
import useOutsideClick from '@/hooks/useOutsideClick'
import useStateChange from '@/hooks/useStateChange'
import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import useUpdateTodo from '@/services/mutates/todo/useUpdateTodo'
import { meQuery } from '@/services/queries/auth/meQuery'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { formatDateToHM, formatDateToMDY } from '@/utils/formatDate'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect } from 'react'

interface Props {
  params: { todoId: string }
}

export default function Page({ params }: Props) {
  const queryClient = getQueryClient()
  const router = useRouter()
  const todoId = params.todoId
  const folderId = useSearchParams().get('folder_id') || ''
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me.userId, Number(folderId)),
  )
  const todo = todos?.find((item) => item.id === Number(todoId))
  const [memo, onChangeMemo, setMemo] = useInput<string>('')
  const { close, open, ref: insideRef } = useStateChange<HTMLDivElement>()
  const outsideRef = useOutsideClick<HTMLDivElement>(close)
  const { mutate: updateTodo } = useUpdateTodo()

  const handleOutsideClick = () => {
    close()
    setTimeout(() => {
      router.back()
    }, 100)
  }

  const handleUpdateButtonClick = () => {
    todo!.is_complete
      ? updateTodo(
          {
            ...todo!,
            is_complete: false,
            updated_at: new Date().toISOString(),
          },
          {
            onSuccess: () => {
              router.back()
            },
          },
        )
      : updateTodo(
          {
            ...todo!,
            is_complete: true,
            updated_at: new Date().toISOString(),
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['todo', folderId],
              })
              router.back()
            },
          },
        )
  }

  const handleDeleteButtonClick = () => {
    router.push(`/delete_todo/${todoId}?folder_id=${folderId}`, {
      scroll: false,
    })
  }

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
    setTimeout(() => {
      open()
    }, 100)
  }, [])

  useEffect(() => {
    if (!todo) {
      handleOutsideClick()
    }
  }, [todo])

  return (
    <div
      ref={outsideRef}
      onClick={handleOutsideClick}
      className="fixed inset-0 z-40 animate-fade-in overflow-hidden bg-black/15"
    >
      <div
        ref={insideRef}
        onClick={(e) => e.stopPropagation()}
        data-status="closed"
        className="absolute bottom-0 right-0 flex h-full w-80 origin-right flex-col justify-between gap-4 overflow-hidden bg-white p-4 shadow-md transition data-[status=closed]:translate-x-20 data-[status=closed]:opacity-0 dark:bg-var-darkgray"
      >
        <Title className="hyphens-auto break-all">{todo?.name}</Title>
        <form
          onSubmit={handleSubmitMemo}
          className="flex flex-1 flex-col gap-4"
        >
          <Line />
          <Title size="xs">등록일</Title>
          <Text>
            {formatDateToMDY(todo?.created_at!)}년{' '}
            {formatDateToHM(todo?.created_at!)}
          </Text>
          <Line />
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
          <Line />
          <Title size="xs">완료 상태</Title>
          <Text>{todo?.is_complete ? '완료' : '미완료'}</Text>
        </form>
        <div className="flex justify-between gap-4">
          <Button variant="icon" onClick={handleUpdateButtonClick}>
            <Icon view="0 -960 960 960">
              {todo?.is_complete ? (
                <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
              ) : (
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              )}
            </Icon>
          </Button>
          <Button onClick={handleDeleteButtonClick} variant="icon">
            <Icon view="0 -960 960 960">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </Icon>
          </Button>
        </div>
      </div>
    </div>
  )
}

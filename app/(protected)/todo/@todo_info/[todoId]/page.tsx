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
import { useTodo } from '@/store/useTodo'
import { Todo } from '@/types/todo'
import { formatDateToHM, formatDateToMDY } from '@/utils/formatDate'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  params: { todoId: string }
}

export default function Page({ params }: Props) {
  const todoId = params.todoId
  const folderId = useSearchParams().get('folder_id') || ''
  const { todos, setTodos, successTodos, setSuccessTodos } = useTodo()
  const [memo, onChangeMemo, setMemo] = useInput('')
  const [todo, setTodo] = useState<Todo | null>(null)
  const router = useRouter()
  const { close, open, ref: insideRef } = useStateChange<HTMLDivElement>()
  const outsideRef = useOutsideClick<HTMLDivElement>(close)

  const handleOutsideClick = () => {
    router.back()
    close()
  }

  const handleSuccessButtonClick = () => {
    if (todo) {
      const nextTodos = todos.filter((prevTodo) => prevTodo.id !== todo.id)
      const validateTodo = {
        ...todo,
        isSuccess: true,
        updatedAt: Date.now(),
        memo: memo || null,
      }

      const nextSuccessTodos = [...successTodos, validateTodo]
      setTodos(nextTodos)
      setSuccessTodos(nextSuccessTodos)
    }
  }

  useEffect(() => {
    if (todoId && folderId) {
      let foundTodo
      const targetTodos = JSON.parse(localStorage.getItem(folderId) || '')
      foundTodo = targetTodos.pending.find(
        (todo: Todo) => todo.id === Number(todoId),
      )
      if (!foundTodo) {
        foundTodo = targetTodos.success.find(
          (todo: Todo) => todo.id === Number(todoId),
        )
      }
      setTodo(foundTodo)
      setMemo(foundTodo?.memo)
      open()
    }
  }, [todoId])

  if (!todoId || !folderId) return null

  if (todo?.isSuccess) {
    return null
  }

  return (
    <div
      ref={outsideRef}
      onClick={handleOutsideClick}
      className="fixed inset-0 z-30 animate-fade-in bg-black/15"
    >
      <div
        ref={insideRef}
        onClick={(e) => e.stopPropagation()}
        data-status="closed"
        className="absolute bottom-0 right-0 flex h-full w-80 origin-right flex-col justify-between gap-4 bg-white p-4 shadow-md transition data-[status=closed]:scale-x-0 dark:bg-var-darkgray"
      >
        <Title className="hyphens-auto break-all">{todo?.name}</Title>
        <div className="flex flex-1 flex-col gap-4">
          <Line />
          <Title size="xs">등록일</Title>
          <Text>
            {formatDateToMDY(todo?.createdAt!)}년{' '}
            {formatDateToHM(todo?.createdAt!)}
          </Text>
          <Line />
          <Title size="xs">메모</Title>
          <TextArea
            value={memo}
            onChange={onChangeMemo}
            placeholder="메모를 입력하세요."
            className="p-2 ring-1 ring-zinc-200 dark:ring-zinc-600"
          />
        </div>
        <div className="flex justify-between gap-4">
          <Button variant="icon" onClick={handleSuccessButtonClick}>
            <Icon view="0 -960 960 960">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </Icon>
          </Button>
          <Button variant="icon">
            <Icon view="0 -960 960 960">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </Icon>
          </Button>
        </div>
      </div>
    </div>
  )
}

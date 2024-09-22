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
import { FormEvent, useEffect, useState } from 'react'

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
    close()
    setTimeout(() => {
      router.back()
    }, 100)
  }

  const handleSuccessButtonClick = () => {
    if (todo && !todo.isSuccess) {
      const nextTodos = todos.filter((prevTodo) => prevTodo.id !== todo.id)
      const validateTodo = {
        ...todo,
        isSuccess: true,
        updatedAt: Date.now(),
      }

      const nextSuccessTodos = [...successTodos, validateTodo]
      setTodos(nextTodos)
      setSuccessTodos(nextSuccessTodos)
    } else {
      const validateTodo = {
        ...todo!,
        isSuccess: false,
        updatedAt: Date.now(),
      }
      const nextTodos = [...todos, validateTodo]

      setTodos(nextTodos)
      const nextSuccessTodos = successTodos.filter(
        (prevTodo) => prevTodo.id !== todo?.id,
      )
      setSuccessTodos(nextSuccessTodos)
    }
    router.back()
  }

  const handleDeleteButtonClick = () => {
    const nextTodos = todos.filter((prevTodo) => prevTodo.id !== todo!.id)
    setTodos(nextTodos)
    router.back()
  }

  const handleSubmitMemo = (e: FormEvent) => {
    e.preventDefault()
    if (todo) {
      const prevTodos = todos.filter((prevTodo) => prevTodo.id !== todo.id)
      const modifiedTodo = {
        ...todo,
        updatedAt: Date.now(),
        memo: memo || '',
      }
      const nextTodos = [...prevTodos, modifiedTodo]
      setTodos(nextTodos)
    }
  }

  useEffect(() => {
    if (todoId && folderId) {
      let foundTodo
      const targetTodos = JSON.parse(localStorage.getItem(folderId) || '')
      setTodos(targetTodos.pending)
      setSuccessTodos(targetTodos.success)

      foundTodo = targetTodos.pending.find(
        (todo: Todo) => todo.id === Number(todoId),
      )
      if (!foundTodo) {
        foundTodo = targetTodos.success.find(
          (todo: Todo) => todo.id === Number(todoId),
        )
      }
      setTodo(foundTodo)
      setMemo(foundTodo?.memo ?? '')
      setTimeout(() => {
        open()
      }, 100)
    }

    return () => {
      const nextTodos = { pending: todos, success: successTodos }
      localStorage.setItem(folderId, JSON.stringify(nextTodos))
    }
  }, [todoId])

  return (
    <div
      ref={outsideRef}
      onClick={handleOutsideClick}
      className="fixed inset-0 z-30 animate-fade-in overflow-hidden bg-black/15"
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
          <Button
            variant="secondary"
            type="submit"
            disabled={!memo || memo === todo?.memo}
            className="self-end"
          >
            메모 추가
          </Button>
          <Title>완료 상태</Title>
          <Text>{todo?.isSuccess ? '완료' : '미완료'}</Text>
        </form>
        <div className="flex justify-between gap-4">
          <Button variant="icon" onClick={handleSuccessButtonClick}>
            <Icon view="0 -960 960 960">
              {todo?.isSuccess ? (
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

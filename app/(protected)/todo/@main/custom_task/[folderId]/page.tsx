'use client'

import Input from '@/components/shared/Input'
import { List } from '@/components/shared/List'
import Title from '@/components/shared/Title'
import { FormEvent, useEffect } from 'react'
import useStateChange from '@/hooks/useStateChange'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import useOutsideClick from '@/hooks/useOutsideClick'

import { useSuspenseQuery } from '@tanstack/react-query'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import Todo from '../../../_components/Todo'
import TaskOptionDropDown from '../../../_components/TaskOptionDropDown'
import { todoFolderQuery } from '@/services/queries/todo/todoFolderQuery'
import { useInput } from '@/hooks/useInput'
import useAddTodo from '@/services/mutates/todo/useAddTodo'
import { Tables } from '@/types/supabase'
import useUpdateTodo from '@/services/mutates/todo/useUpdateTodo'
import { useRouter } from 'next/navigation'

interface Props {
  params: { folderId: string }
}

export default function TaskForm({ params }: Props) {
  const router = useRouter()
  const folderId = params.folderId
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me.userId),
  )
  const { data: FetchedTodos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, Number(folderId), me.userId),
  )
  const [todoText, onChangeTodoText, setTodoText] = useInput('')
  const { onClick, ref, close, onTransitionEnd } =
    useStateChange<HTMLDivElement>()
  const dropdownRef = useOutsideClick<HTMLButtonElement>(close)
  const { mutate: updateTodo } = useUpdateTodo()
  const { mutate: addTodo } = useAddTodo()

  const todos = FetchedTodos.filter((todo) => todo.is_complete === false)
  const successTodos = FetchedTodos.filter((todo) => todo.is_complete === true)
  const selectedFolder = todoFolders.find(
    (folder) => folder.id === Number(folderId),
  )

  const currentMonth = new Date().getMonth() + 1
  const currentDate = new Date().getDate()
  const currentYear = new Date().getFullYear()

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault()
    const currentIndex = localStorage.getItem('todo-index') || 0
    const nextIndex = Number(currentIndex) + 1
    const nextTodo = {
      name: todoText,
      folderId: selectedFolder!.id,
      userId: me.userId,
      index: nextIndex,
    }
    addTodo(nextTodo, {
      onSuccess: () => {
        setTodoText('')
      },
    })
  }

  const handleUpdateButtonClick = (selectedTodo: Tables<'todo'>) => {
    updateTodo(selectedTodo)
  }

  useEffect(() => {
    if (!selectedFolder) {
      router.push('/todo/main')
    }
  }, [selectedFolder])

  return (
    <form
      onSubmit={handleSubmitTodo}
      className="flex w-80 flex-shrink-0 flex-col"
    >
      <div className="relative flex items-center justify-between">
        <Title>{selectedFolder?.name}</Title>
        <Button ref={dropdownRef} variant="icon" size="none" onClick={onClick}>
          <Icon view="0 -960 960 960" size={20}>
            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
          </Icon>
        </Button>
        <TaskOptionDropDown
          folderId={selectedFolder?.id}
          targetRef={ref}
          onTransitionEnd={onTransitionEnd}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Input
          value={todoText}
          onChange={onChangeTodoText}
          placeholder="할일을 입력하세요."
          dimension="sm"
          className="sticky"
        />
        <Text
          type="caption"
          size="sm"
        >{`${currentYear}년 ${currentMonth}월 ${currentDate}일 오늘 할 일`}</Text>
      </div>
      <div className="mt-4 flex flex-col gap-4 text-left">
        {todos.length >= 1 && (
          <div className="flex animate-fade-in flex-col gap-4">
            <Title type="sub">할 일</Title>
            <List className="flex flex-col gap-2">
              {todos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  isComplete={todo.is_complete}
                  onUpdate={handleUpdateButtonClick}
                />
              ))}
            </List>
          </div>
        )}
        {successTodos.length >= 1 && (
          <div className="flex animate-fade-in flex-col gap-4">
            <Title type="sub">완료됨</Title>
            <List className="flex flex-col gap-2">
              {successTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  isComplete={todo.is_complete}
                  onUpdate={handleUpdateButtonClick}
                />
              ))}
            </List>
          </div>
        )}
      </div>
    </form>
  )
}

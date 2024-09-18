'use client'

import Box from '@/components/shared/Box'
import FormContainer from '@/components/shared/FormContainer'
import Input from '@/components/shared/Input'
import { List } from '@/components/shared/List'
import Title from '@/components/shared/Title'
import Todo from './Todo'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import useStateChange from '@/hooks/useStateChange'
import Text from '@/components/shared/Text'
import { Todo as TTodo } from '@/types/todo'

export const INIT_TODO = {
  id: 0,
  name: '',
  createdAt: 0,
  updatedAt: 0,
  isSuccess: false,
}

interface Props {
  todos: TTodo[]
  setTodos: (todos: TTodo[]) => void
  successTodos: TTodo[]
  setSuccessTodos: (todos: TTodo[]) => void
}

export default function TaskForm({
  todos,
  setTodos,
  successTodos,
  setSuccessTodos,
}: Props) {
  const [todo, setTodo] = useState(INIT_TODO)
  const { open, close, ref } = useStateChange<HTMLDivElement>()
  const currentMonth = new Date().getMonth() + 1
  const currentDate = new Date().getDate()
  const currentYear = new Date().getFullYear()

  const handleTodoChange = (e: FormEvent) => {
    e.preventDefault()
    const nextTodos = [...todos, todo]
    setTodos(nextTodos)
    setTodo(INIT_TODO)
  }

  const handleTodoSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({
      id: Date.now(),
      name: e.target.value,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isSuccess: false,
    })
  }

  const handleDeleteButtonClick = useCallback(
    (selectedTodo: typeof INIT_TODO) => {
      const nextTodos = todos.filter((todo) => todo.name !== selectedTodo.name)
      setTodos(nextTodos)
    },
    [todos],
  )

  const handleSuccessButtonClick = (selectedTodo: typeof INIT_TODO) => {
    const nextTodos = todos.filter((todo) => todo.id !== selectedTodo.id)
    const validateTodo = { ...selectedTodo, isSuccess: true }
    const nextSuccessTodos = [...successTodos, validateTodo]
    setTodos(nextTodos)
    setSuccessTodos(nextSuccessTodos)
  }

  const handleResetTodoStatus = (selectedTodo: typeof INIT_TODO) => {
    const validateTodo = { ...selectedTodo, isSuccess: false }
    const nextTodos = [...todos, validateTodo]
    const nextSuccessTodos = successTodos.filter(
      (todo) => todo.id !== selectedTodo.id,
    )
    setTodos(nextTodos)
    setSuccessTodos(nextSuccessTodos)
  }

  return (
    <FormContainer
      onSubmit={handleTodoChange}
      className="flex w-60 flex-shrink-0 flex-col overflow-y-auto"
    >
      <Box col className="gap-2">
        <Input
          value={todo.name}
          onFocus={open}
          onBlur={close}
          onChange={handleTodoSubmit}
          placeholder="할일을 입력하세요."
          dimension="sm"
          className="ring-inset"
        />
        <Text
          type="caption"
          size="sm"
        >{`${currentYear}년 ${currentMonth}월 ${currentDate}일 오늘 할 일`}</Text>
      </Box>
      <Box className="mt-4 flex flex-col gap-4 text-left">
        {todos.length >= 1 && (
          <Box col className="animate-fade-in gap-4">
            <Title type="sub">할 일</Title>
            <List className="flex flex-col gap-2">
              {todos.map((todo) => (
                <Todo
                  key={todo.name}
                  todo={todo}
                  isSuccess={todo.isSuccess}
                  onDelete={handleDeleteButtonClick}
                  onSuccess={handleSuccessButtonClick}
                />
              ))}
            </List>
          </Box>
        )}
        {successTodos.length >= 1 && (
          <Box col className="animate-fade-in gap-4">
            <Title type="sub">완료됨</Title>
            <List className="flex flex-col gap-2">
              {successTodos.map((todo) => (
                <Todo
                  key={todo.name}
                  todo={todo}
                  isSuccess={todo.isSuccess}
                  onSuccess={handleResetTodoStatus}
                />
              ))}
            </List>
          </Box>
        )}
      </Box>
    </FormContainer>
  )
}

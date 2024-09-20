'use client'

import Input from '@/components/shared/Input'
import { List } from '@/components/shared/List'
import Title from '@/components/shared/Title'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import useStateChange from '@/hooks/useStateChange'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import useOutsideClick from '@/hooks/useOutsideClick'

import { useTodo } from '@/store/useTodo'
import Todo from '../../_components/Todo'
import TaskOptionDropDown from '../../_components/TaskOptionDropDown'

const INIT_TODO = {
  id: 0,
  name: '',
  createdAt: 0,
  updatedAt: 0,
  isSuccess: false,
}

export default function TaskForm() {
  const {
    todoFolders,
    todos,
    setTodos,
    successTodos,
    selectedFolder,
    setSuccessTodos,
  } = useTodo()
  const [todoText, setTodoText] = useState('')
  const { onClick, ref, close, onTransitionEnd } =
    useStateChange<HTMLDivElement>()
  const dropdownRef = useOutsideClick<HTMLButtonElement>(close)

  const currentMonth = new Date().getMonth() + 1
  const currentDate = new Date().getDate()
  const currentYear = new Date().getFullYear()

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault()
    const nextTodo = {
      id: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name: todoText,
      isSuccess: false,
    }
    const nextTodos = [...todos, nextTodo]
    setTodos(nextTodos)
    setTodoText('')
  }

  const handleChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value)
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
    const validateTodo = {
      ...selectedTodo,
      isSuccess: true,
      updatedAt: Date.now(),
    }
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

  useEffect(() => {
    if (selectedFolder) {
      const selectedTodos = JSON.parse(
        localStorage.getItem(selectedFolder.id.toString())!,
      )
      setTodos(selectedTodos?.pending ?? [])
      setSuccessTodos(selectedTodos?.success ?? [])
    }
  }, [selectedFolder?.id])

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
          onChange={handleChangeTodo}
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
                  key={todo.name}
                  todo={todo}
                  isSuccess={todo.isSuccess}
                  onDelete={handleDeleteButtonClick}
                  onSuccess={handleSuccessButtonClick}
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
                  key={todo.name}
                  todo={todo}
                  isSuccess={todo.isSuccess}
                  onSuccess={handleResetTodoStatus}
                />
              ))}
            </List>
          </div>
        )}
      </div>
    </form>
  )
}

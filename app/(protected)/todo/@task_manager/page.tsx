'use client'

import { useEffect } from 'react'
import Container from '@/components/shared/Container'
import TaskForm from './_components/TaskForm'
import { useTodo } from '@/store/useTodo'
import Title from '@/components/shared/Title'

export default function TodoPage() {
  const {
    todoFolders,
    selectedFolder,
    setTodos,
    todos,
    successTodos,
    setSuccessTodos,
  } = useTodo()

  useEffect(() => {
    if (selectedFolder && (todos.length >= 1 || successTodos.length >= 1)) {
      localStorage.setItem(
        selectedFolder.id.toString(),
        JSON.stringify({ pending: todos, success: successTodos }),
      )
    }
  }, [todos, successTodos])

  useEffect(() => {
    if (selectedFolder) {
      const selectedTodos = JSON.parse(
        localStorage.getItem(selectedFolder.id.toString())!,
      )

      setTodos(selectedTodos?.pending ?? [])
      setSuccessTodos(selectedTodos?.success ?? [])
    }
  }, [selectedFolder && selectedFolder.id])

  return (
    <Container className="flex h-[calc(100dvh-80px)] w-full flex-col gap-4 overflow-x-auto p-4">
      <Title>{selectedFolder?.name}</Title>
      <TaskForm
        key={selectedFolder?.id}
        todos={todos}
        setTodos={setTodos}
        successTodos={successTodos}
        setSuccessTodos={setSuccessTodos}
      />
    </Container>
  )
}

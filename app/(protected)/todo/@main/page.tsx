'use client'

import { useEffect } from 'react'
import TaskForm from './_components/TaskForm'
import { useTodo } from '@/store/useTodo'
import cn from '@/lib/cn'
import TodoDashBoard from './_components/TodoDashBoard'

export default function TodoPage() {
  const {
    selectedFolder,
    selectedFolderId,
    setSelectedFolderId,
    setTodos,
    todos,
    successTodos,
    setSuccessTodos,
    todoFolders,
  } = useTodo()

  useEffect(() => {
    if (todos.length >= 1 || successTodos.length >= 1) {
      const nextTargetFolder = selectedFolderId
        ? selectedFolderId
        : selectedFolder?.id
      if (nextTargetFolder) {
        localStorage.setItem(
          nextTargetFolder!.toString(),
          JSON.stringify({ pending: todos, success: successTodos }),
        )
      }
    }
    setSelectedFolderId(null)
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
    <div
      className={cn(
        'relative flex h-[calc(100dvh-80px)] w-full flex-col gap-4 overflow-x-auto p-4',
        selectedFolder?.dotColor === 'yellow' &&
          'bg-var-yellow/15 dark:bg-var-yellow/25',
        selectedFolder?.dotColor === 'orange' &&
          'bg-var-orange/15 dark:bg-var-orange/25',
        selectedFolder?.dotColor === 'black' && 'bg-black/15 dark:bg-black/25',
        selectedFolder?.dotColor === 'blue' &&
          'bg-var-blue/15 dark:bg-var-blue/25',
        selectedFolder?.dotColor === 'green' &&
          'bg-var-green/15 dark:bg-var-green/25',
        selectedFolder?.dotColor === 'red' &&
          'bg-red-500/15 dark:bg-red-500/25',
        selectedFolder?.dotColor === 'purple' &&
          'bg-purple-500/15 dark:bg-purple-500/25',
      )}
    >
      {selectedFolder ? (
        <TaskForm
          key={selectedFolder?.id}
          selectedFolder={selectedFolder}
          todos={todos}
          setTodos={setTodos}
          successTodos={successTodos}
          setSuccessTodos={setSuccessTodos}
        />
      ) : (
        <TodoDashBoard todoFolders={todoFolders} />
      )}
    </div>
  )
}

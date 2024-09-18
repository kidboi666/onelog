'use client'

import { useEffect } from 'react'
import Container from '@/components/shared/Container'
import TaskForm from './_components/TaskForm'
import { useTodo } from '@/store/useTodo'
import Title from '@/components/shared/Title'
import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import TaskOptionDropDown from './_components/TaskOptionDropDown'

export default function TodoPage() {
  const { selectedFolder, setTodos, todos, successTodos, setSuccessTodos } =
    useTodo()
  const { onClick, ref, open, close, onTransitionEnd } =
    useStateChange<HTMLDivElement>()
  const dropdownRef = useOutsideClick<HTMLButtonElement>(close)

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
      <Box row className="relative items-center justify-between">
        <Title>{selectedFolder?.name}</Title>
        <Button
          ref={dropdownRef}
          variant="icon"
          onClick={onClick}
          className="hover:bg-zinc-300 dark:hover:bg-zinc-600"
        >
          <Icon view="0 -960 960 960" size={18}>
            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
          </Icon>
        </Button>
        <TaskOptionDropDown targetRef={ref} onTransitionEnd={onTransitionEnd} />
      </Box>
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

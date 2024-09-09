'use client'

import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import FormContainer from '@/components/shared/FormContainer'
import Icon from '@/components/shared/Icon'
import Input from '@/components/shared/Input'
import { List } from '@/components/shared/List'
import RefBox from '@/components/shared/RefBox'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { useInput } from '@/hooks/useInput'
import useStateChange from '@/hooks/useStateChange'
import cn from '@/lib/cn'
import { FormEvent, RefObject, useCallback, useEffect, useState } from 'react'

interface TodoProps {
  todo: string
  onDelete?: (selectedTodo: string) => void
  onSuccess?: (selectedTodo: string) => void
}

const Todo = ({ todo, onDelete, onSuccess }: TodoProps) => {
  return (
    <List.Row>
      <Text
        className={cn(
          'flex animate-fade-in items-center justify-between gap-4 text-xs',
          onDelete && onSuccess ? '' : 'text-slate-400',
        )}
      >
        {todo}
        {onDelete && onSuccess ? (
          <Box className="flex gap-2">
            <Button
              size="emptyStyle"
              className="size-6 rounded-full"
              onClick={() => onSuccess!(todo)}
            >
              <Icon size={20} view={20}>
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </Icon>
            </Button>
            <Button
              size="emptyStyle"
              variant="secondary"
              onClick={() => onDelete!(todo)}
              className="size-6 rounded-full text-gray-400"
            >
              <Icon size={20} view={27}>
                <path
                  d="M8.31361 17.9346C7.94447 18.3037 7.92689 18.9629 8.3224 19.3408C8.70033 19.7363 9.3683 19.7188 9.73744 19.3496L14.0001 15.0869L18.2628 19.3496C18.6408 19.7275 19.2911 19.7363 19.6691 19.3408C20.0646 18.9629 20.0558 18.3037 19.6779 17.9258L15.4152 13.6631L19.6779 9.40918C20.0558 9.02246 20.0646 8.37207 19.6691 7.99414C19.2911 7.59863 18.6408 7.60742 18.2628 7.98535L14.0001 12.248L9.73744 7.98535C9.3683 7.61621 8.70033 7.59863 8.3224 7.99414C7.92689 8.37207 7.94447 9.03125 8.31361 9.40039L12.5763 13.6631L8.31361 17.9346Z"
                  fill="currentColor"
                ></path>
              </Icon>
            </Button>
          </Box>
        ) : null}
      </Text>
    </List.Row>
  )
}

interface Props {
  className?: string
  statusRef: RefObject<HTMLDivElement>
}

export default function TodoPage({ className, statusRef }: Props) {
  const [todoText, onChangeTodoText, setTodoText] = useInput('')
  const [todos, setTodos] = useState<string[]>([])
  const [successTodos, setSuccessTodos] = useState<string[]>([])
  const { open, close, ref } = useStateChange<HTMLDivElement>()

  const handleTodoChange = (e: FormEvent) => {
    e.preventDefault()
    const nextTodos = [...todos, todoText]
    setTodos(nextTodos)
    localStorage.setItem('todos', JSON.stringify(nextTodos))
  }

  const handleDeleteButtonClick = useCallback(
    (selectedTodo: string) => {
      const nextTodos = todos.filter((todo) => todo !== selectedTodo)

      localStorage.setItem('todos', JSON.stringify(nextTodos))
      setTodos(nextTodos)
    },
    [todos],
  )

  const handleSuccessButtonClick = (selectedTodo: string) => {
    const nextTodos = todos.filter((todo) => todo !== selectedTodo)
    const nextSuccessTodos = [...successTodos, selectedTodo]
    localStorage.setItem('todos', JSON.stringify(nextTodos))
    localStorage.setItem('successTodos', JSON.stringify(nextSuccessTodos))
    setTodos(nextTodos)
    setSuccessTodos((prev) => [...prev, selectedTodo])
  }

  useEffect(() => {
    if (todos.length === 0) {
      const prevTodos = JSON.parse(localStorage.getItem('todos')!) || []
      setTodos([...prevTodos])
    }
    if (successTodos.length === 0) {
      const prevSuccessTodos =
        JSON.parse(localStorage.getItem('successTodos')!) || []
      setSuccessTodos([...prevSuccessTodos])
    }
  }, [])

  useEffect(() => {
    return () => {
      setTodoText('')
    }
  }, [todos])

  return (
    <Container
      ref={statusRef}
      dataStatus="closed"
      className={cn(
        'right-0 top-full w-96 cursor-default max-md:fixed max-md:left-1/2 max-md:w-[calc(100dvw-40px)] max-md:-translate-x-1/2',
        className,
      )}
    >
      <FormContainer onSubmit={handleTodoChange} className="w-full">
        <Input
          variant="secondary"
          value={todoText}
          onFocus={open}
          onBlur={close}
          onChange={onChangeTodoText}
          placeholder="할일을 입력하세요."
          className="w-full py-1 font-light"
        />
        <RefBox
          ref={ref}
          dataStatus="closed"
          className="data-line status-line bg-var-dark"
        />
        <Box className="mt-4 flex flex-col gap-4 text-left">
          <Box>
            <Title type="sub">Task</Title>
            <List className="flex flex-col gap-2">
              {todos.map((todo) => (
                <Todo
                  key={todo}
                  todo={todo}
                  onDelete={handleDeleteButtonClick}
                  onSuccess={handleSuccessButtonClick}
                />
              ))}
            </List>
          </Box>
          <Box>
            <Title type="sub">Success</Title>
            <List className="flex flex-col gap-2">
              {successTodos.map((todo) => (
                <Todo key={todo} todo={todo} />
              ))}
            </List>
          </Box>
        </Box>
      </FormContainer>
    </Container>
  )
}

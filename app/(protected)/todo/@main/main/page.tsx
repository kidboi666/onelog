'use client'

import { List } from '@/components/shared/List'
import Title from '@/components/shared/Title'
import cn from '@/lib/cn'
import { FormEvent, useRef, useState } from 'react'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import Input from '@/components/shared/Input'
import { useInput } from '@/hooks/useInput'
import TaskOptionDropDown from '../../_components/TaskOptionDropDown'
import Todo from '../../_components/Todo'
import { Tables } from '@/types/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'
import { todoFolderQuery } from '@/services/queries/todo/todoFolderQuery'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import useAddTodo from '@/services/mutates/todo/useAddTodo'
import useUpdateTodo from '@/services/mutates/todo/useUpdateTodo'
import { getQueryClient } from '@/lib/tanstack/get-query-client'

export default function TodoDashBoard() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me.userId),
  )

  return (
    <>
      <Title>할일 전체</Title>
      <List className="flex flex-wrap gap-4">
        {todoFolders.map((folder) => (
          <TodoFolderCard key={folder.id} folder={folder} userId={me.userId} />
        ))}
      </List>
    </>
  )
}

interface TodoFolderCardProps {
  folder: Tables<'todo_folder'>
  userId: string
}

function TodoFolderCard({ folder, userId }: TodoFolderCardProps) {
  const queryClient = getQueryClient()
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoInProgress(supabase, userId),
  )
  const localTodos = todos?.filter((todo) => todo.folder_id === folder.id)
  const { ref, onClick, onTransitionEnd, close } =
    useStateChange<HTMLDivElement>()
  const dropdownRef = useOutsideClick<HTMLButtonElement>(close)
  const [name, onChangeName, setName] = useInput<string>('')
  const [showInput, setShowInput] = useState(false)
  const { mutate: addTodo } = useAddTodo()
  const { mutate: updateTodo } = useUpdateTodo()
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const handleUpdateButtonClick = (selectedTodo: Tables<'todo'>) => {
    updateTodo(
      { ...selectedTodo, is_complete: true },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo'] })
        },
      },
    )
  }

  const handleSubmitTodo = (e: FormEvent) => {
    const nextIndex = Number(localStorage.getItem('todo-index')) || 0
    e.preventDefault()
    addTodo(
      { name, folderId: folder.id, userId, index: nextIndex + 1 },
      {
        onSuccess: () => {
          setName('')
          queryClient.invalidateQueries({ queryKey: ['todo'] })
        },
      },
    )
    localStorage.setItem('todo-index', (nextIndex + 1).toString())
  }

  return (
    <List.Row
      className={cn(
        'h-fit w-60 rounded-md p-4 shadow-md',
        folder?.color === 'yellow' && 'bg-var-yellow/15 dark:bg-var-yellow/25',
        folder?.color === 'orange' && 'bg-var-orange/15 dark:bg-var-orange/25',
        folder?.color === 'black' && 'bg-black/15 dark:bg-black/25',
        folder?.color === 'blue' && 'bg-var-blue/15 dark:bg-var-blue/25',
        folder?.color === 'green' && 'bg-var-green/15 dark:bg-var-green/25',
        folder?.color === 'red' && 'bg-red-500/15 dark:bg-red-500/25',
        folder?.color === 'purple' && 'bg-purple-500/15 dark:bg-purple-500/25',
      )}
    >
      <div className="relative flex items-center justify-between gap-4">
        <Title size="sm" className="line-clamp-1">
          {folder?.name}
        </Title>
        <div className="flex">
          <Button
            variant="icon"
            size="none"
            onClick={() => setShowInput((prev) => !prev)}
            className="p-1"
          >
            <Icon view="0 -960 960 960" size={20}>
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </Icon>
          </Button>
          <Button
            ref={dropdownRef}
            variant="icon"
            size="none"
            onClick={onClick}
            className="p-1"
          >
            <Icon view="0 -960 960 960" size={20}>
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </Icon>
          </Button>
        </div>
        <TaskOptionDropDown
          folderId={folder?.id}
          targetRef={ref}
          onTransitionEnd={onTransitionEnd}
        />
      </div>
      {showInput && (
        <form
          onSubmit={handleSubmitTodo}
          className="relative mt-2 flex flex-col gap-2"
        >
          <Input
            value={name}
            onChange={onChangeName}
            variant="primary"
            className="w-full pr-8 text-xs"
            placeholder="새로운 할일을 추가하세요."
          />
          <Button
            variant="icon"
            size="none"
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 active:animate-none"
          >
            <Icon view="0 -960 960 960" size={18}>
              <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" />
            </Icon>
          </Button>
        </form>
      )}
      <div className="mt-4 flex flex-col gap-4 text-left">
        {localTodos?.length! >= 1 && (
          <div className="flex animate-fade-in flex-col gap-4">
            <List className="flex flex-col gap-2">
              {localTodos?.map((todo) => (
                <Todo
                  key={todo.id}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                  todo={todo}
                  isComplete={todo.is_complete}
                  onUpdate={handleUpdateButtonClick}
                />
              ))}
            </List>
          </div>
        )}
      </div>
    </List.Row>
  )
}

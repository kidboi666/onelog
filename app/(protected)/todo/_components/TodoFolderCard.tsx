import { FormEvent, useEffect, useState } from 'react'
import { useTodo } from '@/store/useTodo'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import TaskOptionDropDown from './TaskOptionDropDown'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import Todo from './Todo'
import Input from '@/components/shared/Input'
import cn from '@/lib/cn'
import { useInput } from '@/hooks/useInput'
import { Todo as TTodo, TodoFolder } from '@/types/todo'
import Title from '@/components/shared/Title'
import { List } from '@/components/shared/List'

interface TodoFolderCardProps {
  folder: TodoFolder
}

export default function TodoFolderCard({ folder }: TodoFolderCardProps) {
  const { setTodos, setSuccessTodos, setSelectedFolderId } = useTodo()
  const { ref, onClick, onTransitionEnd, close } =
    useStateChange<HTMLDivElement>()
  const dropdownRef = useOutsideClick<HTMLButtonElement>(close)
  const [todoText, onChangeTodoText, setTodoText] = useInput<string>('')
  const [showInput, setShowInput] = useState(false)
  const [localTodos, setLocalTodos] = useState<TTodo[]>([])
  const [localSuccessTodos, setLocalSuccessTodos] = useState<TTodo[]>([])

  const handleSuccessButtonClick = (selectedTodo: TTodo) => {
    const validateTodo = {
      ...selectedTodo,
      isSuccess: true,
      updatedAt: Date.now(),
    }
    const nextSuccessTodos = [...localSuccessTodos, validateTodo]
    setSuccessTodos(nextSuccessTodos)

    const nextTodos =
      localTodos?.filter((todo) => todo.id !== selectedTodo.id) || []
    setTodos(nextTodos)
    setLocalTodos(nextTodos)
    setSelectedFolderId(folder.id)
  }

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault()
    const nextTodo = {
      id: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name: todoText,
      isSuccess: false,
      folderId: folder.id,
      memo: null,
    }
    const nextTodos = [...localTodos, nextTodo]
    setSelectedFolderId(folder.id)
    setLocalTodos(nextTodos)
    setTodos(nextTodos)
    setTodoText('')
  }

  useEffect(() => {
    const selectedTodos = JSON.parse(
      localStorage.getItem(folder.id.toString())!,
    )

    setLocalTodos(selectedTodos?.pending ?? [])
    setLocalSuccessTodos(selectedTodos?.success ?? [])
  }, [])

  return (
    <List.Row
      className={cn(
        'h-fit max-w-52 rounded-md p-4 shadow-md',
        folder?.dotColor === 'yellow' &&
          'bg-var-yellow/15 dark:bg-var-yellow/25',
        folder?.dotColor === 'orange' &&
          'bg-var-orange/15 dark:bg-var-orange/25',
        folder?.dotColor === 'black' && 'bg-black/15 dark:bg-black/25',
        folder?.dotColor === 'blue' && 'bg-var-blue/15 dark:bg-var-blue/25',
        folder?.dotColor === 'green' && 'bg-var-green/15 dark:bg-var-green/25',
        folder?.dotColor === 'red' && 'bg-red-500/15 dark:bg-red-500/25',
        folder?.dotColor === 'purple' &&
          'bg-purple-500/15 dark:bg-purple-500/25',
      )}
    >
      <div className="relative flex items-center justify-between gap-4">
        <Title size="sm">{folder?.name}</Title>
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
            value={todoText}
            onChange={onChangeTodoText}
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
                  key={todo.name}
                  todo={todo}
                  isSuccess={todo.isSuccess}
                  // onDelete={handleDeleteButtonClick}
                  onSuccess={handleSuccessButtonClick}
                />
              ))}
            </List>
          </div>
        )}
      </div>
    </List.Row>
  )
}

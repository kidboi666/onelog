import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import cn from '@/lib/cn'
import { formatDateToHM, formatDateToMDY } from '@/utils/formatDate'
import {
  DragEvent,
  MutableRefObject,
  useRef,
  useState,
  useTransition,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Spinner from '@/components/shared/Spinner'
import { Tables } from '@/types/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import useUpdateTodo from '@/services/mutates/todo/useUpdateTodo'

interface TodoProps {
  todo: Tables<'todo'>
  isComplete: boolean | null
  folderColor?: string
  onUpdate: (selectedTodo: Tables<'todo'>) => void
  isDraggable?: boolean
  dragItem: MutableRefObject<Tables<'todo'> | null>
  dragOverItem: MutableRefObject<Tables<'todo'> | null>
}

export default function Todo({
  todo,
  isComplete,
  folderColor,
  onUpdate,
  isDraggable = false,
  dragItem,
  dragOverItem,
}: TodoProps) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me.userId, todo.folder_id),
  )
  const { mutate: updateTodo } = useUpdateTodo()
  const [showKebabButton, setShowKebabButton] = useState(false)
  const todoEle = useRef<HTMLLIElement>(null)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleTodoClick = () => {
    const colorParams = folderColor ? `&color=${folderColor}` : ''
    router.push(`/todo/${todo.id}?folder_id=${todo.folder_id}${colorParams}`, {
      scroll: false,
    })
  }

  const dragStart = () => {
    dragItem.current = todo
  }

  const dragEnter = () => {
    dragOverItem.current = todo
    const isDraggingDown = dragItem.current!.index < dragOverItem.current.index

    if (isDraggingDown) {
      todoEle.current?.classList.add('border-b-blue-500')
    } else if (!isDraggingDown) {
      todoEle.current?.classList.add('border-t-blue-500')
    }
  }

  const dragOver = (e: DragEvent) => {
    e.preventDefault()
    const isDraggingDown = dragItem.current!.index < dragOverItem.current!.index
    if (isDraggingDown) {
      todoEle.current?.classList.add('border-b-blue-500')
    } else if (!isDraggingDown) {
      todoEle.current?.classList.add('border-t-blue-500')
    }
  }

  const dragLeave = () => {
    todoEle.current?.classList.remove('border-t-blue-500')
    todoEle.current?.classList.remove('border-b-blue-500')
  }

  const drop = (e: DragEvent<HTMLLIElement>) => {
    todoEle.current?.classList.remove('border-t-blue-500')
    todoEle.current?.classList.remove('border-b-blue-500')

    const isEqual = dragItem.current?.index === dragOverItem.current?.index
    if (isEqual) {
      return null
    }

    if (e.currentTarget.classList.contains('')) {
      return onUpdate(dragItem.current!)
    }

    let targetItemList
    let sortedList
    let updatedIndexTodo

    if (dragItem.current!.index < dragOverItem.current!.index) {
      targetItemList = todos.filter(
        (todo) =>
          todo.index !== dragItem.current!.index &&
          todo.index <= dragOverItem.current!.index,
      )
      sortedList = targetItemList.map((item) => ({
        ...item,
        index: item.index - 1,
      }))
      updatedIndexTodo = {
        ...dragItem.current!,
        index: dragOverItem.current!.index,
      }
    } else {
      targetItemList = todos.filter(
        (todo) =>
          todo.index !== dragItem.current!.index &&
          todo.index >= dragOverItem.current!.index,
      )
      sortedList = targetItemList.map((item) => ({
        ...item,
        index: item.index + 1,
      }))
      updatedIndexTodo = {
        ...dragItem.current!,
        index: dragOverItem.current!.index,
      }
    }

    sortedList.forEach((item) => {
      updateTodo({
        ...item,
      })
    })
    updateTodo({ ...updatedIndexTodo })
    dragItem.current = null
    dragOverItem.current = null
  }

  const dragEnd = () => {
    dragItem.current = null
    dragOverItem.current = null
  }

  return (
    <List.Row
      draggable={isDraggable}
      targetRef={todoEle}
      onDragStart={dragStart}
      onDrop={drop}
      onDragEnd={dragEnd}
      onDragLeave={dragLeave}
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onMouseEnter={() => setShowKebabButton(true)}
      onMouseLeave={() => setShowKebabButton(false)}
      onClick={() => startTransition(() => handleTodoClick())}
      className="flex min-w-20 animate-fade-in cursor-pointer gap-2 border border-transparent transition"
    >
      <div className="flex w-full items-center justify-between rounded-md bg-white p-2 shadow-sm hover:opacity-85 dark:bg-var-darkgray">
        <div className="flex items-center gap-2">
          <Button
            size="none"
            variant="icon"
            className={cn(
              'size-4 flex-shrink-0 rounded-full border border-zinc-400 text-white hover:text-zinc-400 dark:border-zinc-600 dark:text-white',
              isComplete ? 'bg-zinc-400 dark:bg-zinc-600' : '',
            )}
            onClick={() => onUpdate(todo)}
          >
            {isComplete && (
              <Icon size={12} view={20} className="animate-grow-up">
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </Icon>
            )}
          </Button>

          <div>
            <Text
              className={cn(
                'line-clamp-4 break-all text-xs',
                isComplete ? 'text-zinc-400 dark:text-zinc-600' : '',
              )}
            >
              {todo.name}
            </Text>
            <Text type="caption" size="xs" className="line-clamp-1">
              {isComplete
                ? `완료일 : ${formatDateToMDY(todo.updated_at ?? '')} ${formatDateToHM(todo.updated_at ?? '')}`
                : `등록일 : ${formatDateToMDY(todo.created_at)} ${formatDateToHM(todo.created_at)}`}
            </Text>
          </div>
        </div>
        <div className="flex gap-2">
          {todo?.memo?.length! >= 1 && (
            <Button disabled variant="icon" size="none">
              <Icon view="0 -960 960 960" size={18}>
                <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
              </Icon>
            </Button>
          )}
          <div className="relative flex gap-2">
            <Button
              size="none"
              variant="icon"
              onClick={() => startTransition(() => handleTodoClick())}
              className={cn(
                'rounded-full',
                showKebabButton ? 'opacity-100' : 'opacity-0',
                isPending && 'opacity-0',
              )}
            >
              <Icon view="0 -960 960 960" size={18}>
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
              </Icon>
            </Button>
            {isPending && (
              <div className="absolute left-0 top-0">
                <Spinner size={18} />
              </div>
            )}
          </div>
        </div>
      </div>
    </List.Row>
  )
}

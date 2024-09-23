import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import cn from '@/lib/cn'
import { formatDateToHM, formatDateToMDY } from '@/utils/formatDate'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/shared/Spinner'
import { Tables } from '@/types/supabase'

interface TodoProps {
  todo: Tables<'todo'>
  isComplete: boolean | null
  onUpdate: (selectedTodo: Tables<'todo'>) => void
}

export default function Todo({ todo, isComplete, onUpdate }: TodoProps) {
  const [isHover, setHover] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleTodoClick = () => {
    router.push(`/todo/${todo.id}?folder_id=${todo.folder_id}`, {
      scroll: false,
    })
  }

  return (
    <List.Row
      draggable
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex animate-fade-in items-center justify-between rounded-md bg-white p-2 shadow-sm transition hover:opacity-85 dark:bg-var-darkgray"
    >
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
          <Text type="caption" size="xs">
            {isComplete
              ? `완료일 : ${formatDateToMDY(todo.updated_at ?? '')} ${formatDateToHM(todo.updated_at ?? '')}`
              : `등록일 : ${formatDateToMDY(todo.created_at)} ${formatDateToHM(todo.created_at)}`}
          </Text>
        </div>
        {isPending && <Spinner size={20} />}
      </div>
      <div className="flex gap-2">
        {todo?.memo?.length! >= 1 && (
          <Button disabled variant="icon" size="none">
            <Icon view="0 -960 960 960" size={18}>
              <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
            </Icon>
          </Button>
        )}
        {isHover ? (
          <div className="flex gap-2">
            <Button
              size="none"
              variant="icon"
              onClick={() => startTransition(() => handleTodoClick())}
              className="rounded-full"
            >
              <Icon view="0 -960 960 960" size={18}>
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
              </Icon>
            </Button>
          </div>
        ) : null}
      </div>
    </List.Row>
  )
}

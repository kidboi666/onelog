'use client'

import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import Spinner from '@/components/shared/Spinner'
import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import useUpdateTodo from '@/services/mutates/todo/useUpdateTodo'
import { meQuery } from '@/services/queries/auth/meQuery'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface Props {
  todoId: string
  folderId: string
}

export default function ButtonSection({ todoId, folderId }: Props) {
  const router = useRouter()
  const queryClient = getQueryClient()

  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me.userId, Number(folderId)),
  )
  const todo = todos?.find((item) => item.id === Number(todoId))

  const [isLoadingDelete, startTransitionDelete] = useTransition()

  const { mutate: updateTodo } = useUpdateTodo()

  const handleDeleteButtonClick = () => {
    startTransitionDelete(() =>
      router.push(`/delete_todo/${todoId}?folder_id=${folderId}`, {
        scroll: false,
      }),
    )
  }

  const handleUpdateButtonClick = () => {
    todo!.is_complete
      ? updateTodo(
          {
            ...todo!,
            is_complete: false,
            updated_at: new Date().toISOString(),
          },
          {
            onSuccess: () => {
              router.back()
            },
          },
        )
      : updateTodo(
          {
            ...todo!,
            is_complete: true,
            updated_at: new Date().toISOString(),
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['todo', folderId],
              })
              router.back()
            },
          },
        )
  }

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      className="flex justify-between gap-4"
    >
      <Button variant="icon" onClick={handleUpdateButtonClick}>
        <Icon view="0 -960 960 960">
          {todo?.is_complete ? (
            <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
          ) : (
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          )}
        </Icon>
      </Button>
      <Button onClick={handleDeleteButtonClick} variant="icon">
        {isLoadingDelete ? (
          <Spinner size={20} />
        ) : (
          <Icon view="0 -960 960 960">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </Icon>
        )}
      </Button>
    </div>
  )
}

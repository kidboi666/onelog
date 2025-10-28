'use client'

import { QUERY_KEY } from '@/src/constants/index'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import useUpdateTodo from '@/src/services/mutates/todo/useUpdateTodo'
import { ITodo } from '@/src/types/entities/todo'
import { ROUTES } from '@/src/routes'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import Spinner from '@/src/components/Spinner'

interface Props {
  todoId: string
  folderId: string
  todo: ITodo
  color: string
  orderFrom: 'main' | 'folder'
}

export default function ButtonSection({
  todoId,
  folderId,
  todo,
  color,
  orderFrom,
}: Props) {
  const router = useRouter()
  const queryClient = getQueryClient()

  const [isLoadingDelete, startTransitionDelete] = useTransition()

  const { mutate: updateTodo } = useUpdateTodo()

  const handleDeleteButtonClick = () => {
    startTransitionDelete(() =>
      router.push(
        ROUTES.MODAL.TODO.DELETE(todoId, folderId, color, orderFrom),
        {
          scroll: false,
        },
      ),
    )
  }

  const handleUpdateButtonClick = () => {
    todo.isComplete
      ? updateTodo(
          {
            ...todo!,
            isComplete: false,
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
            isComplete: true,
          },
          {
            onSuccess: () => {
              void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.TODO.FOLDER(Number(folderId)),
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
          {todo.isComplete ? (
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

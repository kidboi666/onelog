'use client'

import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Title from '@/components/shared/Title'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import useDeleteTodo from '@/services/mutates/todo/useDeleteTodo'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { routes } from '@/routes'
import { queryKey } from '@/lib/tanstack/query-key'

interface Props {
  params: { todoId: string }
  searchParams: {
    folder_id: string
    color: string
    order_from: 'main' | 'folder'
  }
}

export default function DeleteTodoModal({ params, searchParams }: Props) {
  const todoId = params.todoId
  const folderId = searchParams.folder_id
  const orderFrom = searchParams.order_from
  const color = searchParams.color
  const queryClient = getQueryClient()
  const router = useRouter()
  const { mutate: deleteTodo } = useDeleteTodo()
  const handleCancelButtonClick = () => {
    router.back()
  }
  const handleDeleteButtonClick = () => {
    deleteTodo(
      { todoId: Number(todoId!), folderId: Number(folderId!) },
      {
        onSettled: (data, error, variables, context) => {
          queryClient.invalidateQueries({
            queryKey: queryKey.todo.folder(Number(folderId)),
          })
          queryClient.invalidateQueries({
            queryKey: queryKey.todo.inProgress,
          })
          if (orderFrom === 'main') {
            router.push(routes.todo.main)
          } else {
            router.push(routes.todo.view.folder(Number(folderId), color))
          }
        },
      },
    )
  }
  return (
    <Modal>
      <div className="flex flex-col gap-4">
        <Title>정말로 삭제하시겠습니까?</Title>
        <Button onClick={handleDeleteButtonClick} variant="secondary">
          삭제하기
        </Button>
        <Button onClick={handleCancelButtonClick}>취소하기</Button>
      </div>
    </Modal>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import useDeleteTodo from '@/src/services/mutates/todo/useDeleteTodo'
import { ROUTES } from '@/src/routes'
import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'
import Title from '@/src/components/Title'

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
            queryKey: QUERY_KEY.TODO.FOLDER(Number(folderId)),
          })
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.TODO.IN_PROGRESS,
          })
          if (orderFrom === 'main') {
            router.push(ROUTES.TODO.MAIN)
          } else {
            router.push(ROUTES.TODO.VIEW.FOLDER(Number(folderId), color))
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

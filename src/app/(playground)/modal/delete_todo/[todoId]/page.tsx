'use client'

import { QUERY_KEY } from '@/src/constants/index'
import { useRouter } from 'next/navigation'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
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

export default function DeleteTodoModal({
  params: { todoId },
  searchParams: { folder_id: folderId, order_from: orderFrom, color },
}: Props) {
  const queryClient = getQueryClient()
  const router = useRouter()
  const { mutate: deleteTodo } = useDeleteTodo()

  const handleCancelButtonClick = () => {
    router.back()
  }

  const handleDeleteButtonClick = () => {
    deleteTodo(
      { todoId: Number(todoId), folderId: Number(folderId) },
      {
        onSettled: async (data, error, variables, context) => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: QUERY_KEY.TODO.FOLDER(Number(folderId)),
            }),
            queryClient.invalidateQueries({
              queryKey: QUERY_KEY.TODO.IN_PROGRESS,
            }),
          ])
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

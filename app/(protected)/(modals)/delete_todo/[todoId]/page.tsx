'use client'

import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Title from '@/components/shared/Title'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import useDeleteTodo from '@/services/mutates/todo/useDeleteTodo'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

export default function DeleteTodoModal() {
  const { todoId } = useParams()
  const queryClient = getQueryClient()
  const folderId = useSearchParams().get('folder_id')
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
          queryClient.invalidateQueries({ queryKey: ['todo', 'in_progress'] })
          router.back()
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

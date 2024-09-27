'use client'

import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Title from '@/components/shared/Title'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import useDeleteTodo from '@/services/mutates/todo/useDeleteTodo'
import { useRouter } from 'next/navigation'

interface Props {
  params: { todoId: string }
  searchParams: { folder_id: string }
}

export default function DeleteTodoModal({ params, searchParams }: Props) {
  const queryClient = getQueryClient()
  const todoId = params.todoId
  const folderId = searchParams.folder_id
  const router = useRouter()
  const { mutate: deleteTodo } = useDeleteTodo()

  const handleCancelButtonClick = () => {
    router.back()
  }

  const handleDeleteButtonClick = () => {
    deleteTodo(
      { todoId: Number(todoId!), folderId: Number(folderId!) },
      {
        onSettled: () => {
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

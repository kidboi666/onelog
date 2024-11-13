'use client'

import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Title from '@/components/shared/Title'
import useDeleteTodoFolder from '@/services/mutates/todo/useDeleteTodoFolder'
import { useRouter } from 'next/navigation'

interface Props {
  params: { folderId: string }
}

export default function DeleteTodoFolderModal({ params }: Props) {
  const folderId = params.folderId
  const router = useRouter()
  const { mutate: deleteFolder } = useDeleteTodoFolder()

  const handleCancelButtonClick = () => {
    router.back()
  }

  const handleDeleteButtonClick = () => {
    deleteFolder(Number(folderId!))
    router.back()
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

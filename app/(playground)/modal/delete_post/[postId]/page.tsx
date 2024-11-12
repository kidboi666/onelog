'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Title from '@/components/shared/Title'
import { useTransition } from 'react'
import useDeletePost from '@/services/mutates/post/useDeletePost'
import { XStack } from '@/components/shared/Stack'

interface Props {
  params: { postId: string }
}

export default function DeletePostModal({ params }: Props) {
  const router = useRouter()
  const { mutate: deletePost } = useDeletePost()
  const [isLoading, startTransition] = useTransition()

  const handlePostDelete = () => {
    deletePost(Number(params.postId), {
      onSettled: () => router.back(),
    })
  }

  return (
    <Modal>
      <Title>정말 게시물을 삭제하시겠습니까?</Title>
      <XStack>
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          취소하기
        </Button>
        <Button
          onClick={() => startTransition(() => handlePostDelete())}
          isLoading={isLoading}
        >
          삭제하기
        </Button>
      </XStack>
    </Modal>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Title from '@/components/shared/Title'
import { useTransition } from 'react'
import { XStack } from '@/components/shared/Stack'
import useDeleteComment from '@/services/mutates/comment/useDeleteComment'

interface Props {
  params: { commentId: string }
  searchParams: { sentence_id: string }
}

export default function DeleteCommentModal({ params, searchParams }: Props) {
  const router = useRouter()
  const { mutate: deleteComment } = useDeleteComment()
  const [isLoading, startTransition] = useTransition()

  const handleCommentDelete = () => {
    deleteComment(
      {
        commentId: Number(params.commentId),
        sentenceId: Number(searchParams.sentence_id),
      },
      {
        onSettled: () => router.back(),
      },
    )
  }

  return (
    <Modal>
      <Title>정말 댓글을 삭제하시겠습니까?</Title>
      <XStack>
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          취소하기
        </Button>
        <Button
          onClick={() => startTransition(() => handleCommentDelete())}
          isLoading={isLoading}
        >
          삭제하기
        </Button>
      </XStack>
    </Modal>
  )
}

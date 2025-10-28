'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import useDeleteComment from '@/src/services/mutates/comment/useDeleteComment'
import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'
import { XStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

interface Props {
  params: { commentId: string }
  searchParams: { post_id: string }
}

export default function DeleteCommentModal({ params, searchParams }: Props) {
  const router = useRouter()
  const { mutate: deleteComment } = useDeleteComment()
  const [isLoading, startTransition] = useTransition()

  const handleCommentDelete = () => {
    startTransition(() =>
      deleteComment({
        commentId: Number(params.commentId),
        postId: Number(searchParams.post_id),
      }),
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
        <Button onClick={handleCommentDelete} isLoading={isLoading}>
          삭제하기
        </Button>
      </XStack>
    </Modal>
  )
}

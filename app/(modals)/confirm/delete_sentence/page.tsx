'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Title from '@/components/shared/Title'
import { useTransition } from 'react'
import useDeleteSentence from '@/services/mutates/sentence/useDeleteSentence'

export default function DeleteSentenceModal() {
  const router = useRouter()
  const sentenceId = useSearchParams().get('sentence_id')
  const { mutate: deleteSentence } = useDeleteSentence()
  const [isLoading, startTransition] = useTransition()

  const handleSentenceDelete = () => {
    deleteSentence(parseInt(sentenceId!))
  }

  return (
    <Modal>
      <Title>정말 게시물을 삭제하시겠습니까?</Title>
      <div className="flex gap-2">
        <Button
          onClick={() => startTransition(() => handleSentenceDelete())}
          isLoading={isLoading}
          variant="secondary"
        >
          삭제하기
        </Button>
        <Button disabled={isLoading} onClick={() => router.back()}>
          취소하기
        </Button>
      </div>
    </Modal>
  )
}

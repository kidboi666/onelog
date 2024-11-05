'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Title from '@/components/shared/Title'
import { useTransition } from 'react'
import useDeleteSentence from '@/services/mutates/sentence/useDeleteSentence'
import { XStack } from '@/components/shared/Stack'

interface Props {
  params: { sentence_id: string }
}

export default function DeleteSentenceModal({ params }: Props) {
  const router = useRouter()
  // const pathname = useSearchParams()
  // const sentenceId = pathname.get('sentence_id')
  const { mutate: deleteSentence } = useDeleteSentence()
  const [isLoading, startTransition] = useTransition()

  const handleSentenceDelete = () => {
    deleteSentence(parseInt(params.sentence_id || ''))
  }

  return (
    <Modal>
      <Title>정말 게시물을 삭제하시겠습니까?</Title>
      <XStack>
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
      </XStack>
    </Modal>
  )
}

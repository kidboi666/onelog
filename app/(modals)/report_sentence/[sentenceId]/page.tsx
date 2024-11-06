'use client'

import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Modal from '@/components/shared/Modal'
import { XStack, YStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface Props {
  params: { sentenceId: string }
}

export default function ReportSentence({ params }: Props) {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, Number(params.sentenceId)),
  )

  const handleSentenceReport = () => {
    null
  }

  return (
    <Modal>
      <Title>게시물 신고</Title>
      <YStack className="w-full">
        <Text>신고 사유</Text>
        <Input />
      </YStack>
      <XStack>
        <Button variant="secondary" onClick={() => router.back()}>
          취소하기
        </Button>
        <Button
          onClick={() => startTransition(() => handleSentenceReport())}
          isLoading={isLoading}
        >
          신고하기
        </Button>
      </XStack>
    </Modal>
  )
}

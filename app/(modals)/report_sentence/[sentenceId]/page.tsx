'use client'

import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Modal from '@/components/shared/Modal'
import { XStack, YStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { useInput } from '@/hooks/useInput'
import { supabase } from '@/lib/supabase/client'
import useReport from '@/services/mutates/report/useReport'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface Props {
  params: { sentenceId: string }
}

export default function ReportSentenceModal({ params }: Props) {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [reason, onChangeReasonValue] = useInput('')
  const { mutate: report } = useReport()
  const [isLoading, startTransition] = useTransition()

  const handleSentenceReport = () => {
    report(
      {
        reason,
        reporterId: me?.userId,
        targetId: Number(params.sentenceId),
      },
      {
        onSuccess: () => {
          router.push('/success')
          router.back()
        },
      },
    )
  }

  return (
    <Modal>
      <Title>게시물 신고</Title>
      <YStack className="w-full">
        <Text>신고 사유</Text>
        <Input value={reason} onChange={onChangeReasonValue} />
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

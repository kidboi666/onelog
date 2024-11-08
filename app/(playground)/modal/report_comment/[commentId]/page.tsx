'use client'

import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import { XStack, YStack } from '@/components/shared/Stack'
import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import { useInput } from '@/hooks/useInput'
import { supabase } from '@/lib/supabase/client'
import useReport from '@/services/mutates/report/useReport'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface Props {
  params: { commentId: string }
}

export default function ReportCommentModal({ params }: Props) {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [reason, onChangeReasonValue] = useInput('')
  const { mutate: report } = useReport()
  const [isLoading, startTransition] = useTransition()

  const handleCommentReport = () => {
    report(
      {
        reason,
        reporterId: me?.userId,
        targetCommentId: Number(params.commentId),
      },
      {
        onSuccess: () => {
          router.push('/modal/success')
          router.back()
        },
      },
    )
  }

  return (
    <Modal>
      <Title>댓글 신고</Title>
      <YStack className="w-full">
        <Title size="xs">신고 사유</Title>
        <TextArea value={reason} onChange={onChangeReasonValue} />
      </YStack>
      <XStack gap={4}>
        <Button variant="secondary" onClick={() => router.back()}>
          취소하기
        </Button>
        <Button
          onClick={() => startTransition(() => handleCommentReport())}
          isLoading={isLoading}
        >
          신고하기
        </Button>
      </XStack>
    </Modal>
  )
}

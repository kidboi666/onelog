'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import useReport from '@/src/services/mutates/report/useReport'
import { meQuery } from '@/src/services/queries/auth/me-query'
import useInput from '@/src/hooks/useInput'
import { ROUTES } from '@/src/routes'
import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'
import { XStack, YStack } from '@/src/components/Stack'
import TextArea from '@/src/components/TextArea'
import Title from '@/src/components/Title'

interface Props {
  params: { commentId: string }
}

export default function ReportCommentModal({ params }: Props) {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getSession(supabase))
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
          router.push(ROUTES.MODAL.SUCCESS, { scroll: false })
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
      <XStack gap={4} className="w-full">
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="flex-1"
        >
          취소하기
        </Button>
        <Button
          onClick={() => startTransition(() => handleCommentReport())}
          isLoading={isLoading}
          className="flex-1"
        >
          신고하기
        </Button>
      </XStack>
    </Modal>
  )
}

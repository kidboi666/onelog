'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
import useReport from '@/src/services/mutates/report/useReport'
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
  const { me } = useMe()
  const [reason, onChangeReasonValue] = useInput('')
  const { mutate: report } = useReport()
  const [isLoading, startTransition] = useTransition()

  const handleCommentReport = () => {
    if (!me) return null

    startTransition(() =>
      report(
        {
          reason,
          reporterId: me.id,
          targetCommentId: Number(params.commentId),
        },
        {
          onSuccess: () => {
            router.push(ROUTES.MODAL.SUCCESS, { scroll: false })
          },
        },
      ),
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
          onClick={handleCommentReport}
          isLoading={isLoading}
          className="flex-1"
        >
          신고하기
        </Button>
      </XStack>
    </Modal>
  )
}

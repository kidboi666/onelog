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
  params: { postId: string }
}

export default function ReportPostModal({ params }: Props) {
  const router = useRouter()
  const { me } = useMe()
  const [reason, onChangeReasonValue] = useInput('')
  const { mutate: report } = useReport()
  const [isLoading, startTransition] = useTransition()

  const handlePostReport = () => {
    if (!me) return null

    startTransition(() =>
      report(
        {
          reason,
          reporterId: me?.id,
          targetPostId: Number(params.postId),
        },
        {
          onSuccess: () => {
            router.push(ROUTES.MODAL.SUCCESS, { scroll: false })
            router.back()
          },
        },
      ),
    )
  }

  return (
    <Modal>
      <Title>게시물 신고</Title>
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
          onClick={handlePostReport}
          isLoading={isLoading}
          className="flex-1"
        >
          신고하기
        </Button>
      </XStack>
    </Modal>
  )
}

'use client'

import { YStack } from '@/components/shared/Stack'
import SentenceContainer from './_containers/SentenceContainer'

interface Props {
  params: { sentenceId: string }
}

export default function SentencePage({ params }: Props) {
  const sentenceId = parseInt(params.sentenceId)

  return (
    <YStack gap={8}>
      <SentenceContainer sentenceId={sentenceId} />
    </YStack>
  )
}

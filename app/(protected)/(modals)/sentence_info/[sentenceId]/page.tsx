'use client'

import Box from '@/components/shared/Box'
import EmotionBlock from '@/components/shared/EmotionBlock'
import Modal from '@/components/shared/Modal'
import Text from '@/components/shared/Text'
import { supabase } from '@/lib/supabase/client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { formatDateToHM, formatDateToMDY } from '@/utils/formatDate'
import { useSuspenseQuery } from '@tanstack/react-query'
import FavoriteButton from './_components/FavoriteButton'
import CommentButton from './_components/CommentButton'

interface Props {
  params: { sentenceId: string }
}

export default function SentenceInfoModal({ params }: Props) {
  const sentenceId = params.sentenceId
  const { data } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, sentenceId),
  )
  const formatEmotionLevel = (emotionLevel: string) => {
    switch (emotionLevel) {
      case '0%':
        return 0
      case '25%':
        return 1
      case '50%':
        return 2
      case '75%':
        return 3
      case '100%':
        return 4
    }
  }
  return (
    <Modal className="items-start">
      <Box col className="gap-4">
        <Box row className="items-center gap-2">
          <Text type="caption">그 날의 감정 농도</Text>
          <EmotionBlock
            level={formatEmotionLevel(data?.emotion_level) ?? 0}
            className="size-4"
          />
          <Text>{data.emotion_level}</Text>
        </Box>
        <Text>{data.content}</Text>
      </Box>
      <Box col className="gap-4">
        <Text type="caption">
          {formatDateToMDY(data.created_at)} · {formatDateToHM(data.created_at)}
        </Text>
        <Box row className="gap-4">
          <Box row className="gap-2">
            <FavoriteButton size={20} />
            <Text type="caption">{data.favorite ?? 0}</Text>
          </Box>
          <Box row className="gap-2">
            <CommentButton size={20} />
            <Text type="caption">{data.comment ?? 0}</Text>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

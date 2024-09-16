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
import Avatar from '@/components/feature/user/Avatar'

interface Props {
  params: { sentenceId: string }
}

export default function SentenceInfoModal({ params }: Props) {
  const sentenceId = params.sentenceId
  const { data: sentences } = useSuspenseQuery(
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
      <Box col className="w-full gap-4">
        <Box row className="items-start justify-between gap-2">
          <Box row className="items-center gap-2">
            <Text type="caption">그 날의 감정 농도</Text>
            <EmotionBlock
              level={formatEmotionLevel(sentences?.emotion_level) ?? 0}
              className="size-4"
            />
            <Text>{sentences?.emotion_level}</Text>
          </Box>
          <Avatar src={sentences?.avatar_url || null} size="sm" />
        </Box>
        <Text>{sentences?.content}</Text>
      </Box>
      <Box col className="gap-4">
        <Text type="caption">
          {formatDateToMDY(sentences?.created_at)} ·{' '}
          {formatDateToHM(sentences?.created_at)}
        </Text>
        <Box row className="gap-4">
          <Box row className="gap-2">
            <FavoriteButton size={20} />
            <Text type="caption">{sentences?.favorite ?? 0}</Text>
          </Box>
          <Box row className="gap-2">
            <CommentButton size={20} />
            <Text type="caption">{0}</Text>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

'use client'

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
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Text type="caption">그 날의 감정 농도</Text>
            <EmotionBlock
              level={formatEmotionLevel(sentences?.emotion_level) ?? 0}
              className="size-4"
            />
            <Text>{sentences?.emotion_level}</Text>
          </div>
          <Avatar src={sentences?.avatar_url || null} size="sm" />
        </div>
        <Text>{sentences?.content}</Text>
      </div>
      <div className="flex flex-col gap-4">
        <Text type="caption">
          {formatDateToMDY(sentences?.created_at)} ·{' '}
          {formatDateToHM(sentences?.created_at)}
        </Text>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <FavoriteButton size={20} />
            <Text type="caption">{sentences?.favorite ?? 0}</Text>
          </div>
          <div className="flex gap-2">
            <CommentButton size={20} />
            <Text type="caption">{0}</Text>
          </div>
        </div>
      </div>
    </Modal>
  )
}

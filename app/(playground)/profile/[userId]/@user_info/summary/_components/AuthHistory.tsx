'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { useTheme } from '@/store/useTheme'
import { userQuery } from '@/services/queries/auth/userQuery'
import { TColor } from '@/types/theme'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { getSignUpDays } from '@/utils/formatDate'
import { emotionQuery } from '@/services/queries/emotion/emotionQuery'
import HistoryBlock from './HistoryBlock'
import { XStack } from '@/components/shared/Stack'

export default function AuthHistory() {
  const pathname = usePathname()
  const [_, __, userId] = pathname.split('/')
  const { color } = useTheme()
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const { data: sentenceLength } = useSuspenseQuery(
    sentenceQuery.getAllMySentenceCount(supabase, userId),
  )
  const { data: myAverageEmotion } = useSuspenseQuery(
    emotionQuery.getEmotionAverage(supabase, userId),
  )

  const formatColor = (color: TColor) => {
    switch (color) {
      case 'green':
        return 'text-var-green dark:text-var-green'
      case 'blue':
        return 'text-var-blue dark:text-var-blue'
      case 'yellow':
        return 'text-var-yellow dark:text-var-yellow'
      case 'orange':
        return 'text-var-orange dark:text-var-orange'
      case 'black':
        return 'text-var-black dark:text-white '
      default:
        'text-var-black dark:text-white'
        break
    }
  }

  return (
    <XStack gap={8}>
      <HistoryBlock
        title="시작한지"
        content={getSignUpDays(user?.created_at)}
        unit="일 째"
      />
      <HistoryBlock title="기록" content={sentenceLength} unit="개" />
      <HistoryBlock
        title="평균 감정 농도"
        content={myAverageEmotion}
        className={formatColor(color)}
        unit="%"
      />
    </XStack>
  )
}

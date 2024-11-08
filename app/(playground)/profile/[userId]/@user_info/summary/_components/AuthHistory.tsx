'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { colorTheme, useTheme } from '@/store/useTheme'
import { userQuery } from '@/services/queries/auth/userQuery'
import { getSignUpDays } from '@/utils/formatDate'
import { emotionQuery } from '@/services/queries/emotion/emotionQuery'
import HistoryBlock from './HistoryBlock'
import { XStack } from '@/components/shared/Stack'
import { countSentenceQuery } from '@/services/queries/sentence/countSentenceQuery'
import { Container } from '@/components/shared/Container'

export default function AuthHistory() {
  const pathname = usePathname()
  const [_, __, userId] = pathname.split('/')
  const { color } = useTheme()
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const { data: sentenceLength } = useSuspenseQuery(
    countSentenceQuery.countAllMySentence(supabase, userId),
  )
  const { data: myAverageEmotion } = useSuspenseQuery(
    emotionQuery.getEmotionAverage(supabase, userId),
  )

  return (
    <Container className="animate-fade-in">
      <XStack className="sm:gap-8">
        <HistoryBlock
          title="시작한지"
          content={getSignUpDays(user?.created_at)}
          unit="일 째"
        />
        <HistoryBlock title="기록" content={sentenceLength} unit="개" />
        <HistoryBlock
          title="평균 감정 농도"
          content={myAverageEmotion}
          className={colorTheme({ color })}
          unit="%"
        />
      </XStack>
    </Container>
  )
}

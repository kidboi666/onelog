'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { colorTheme, useTheme } from '@/src/store/hooks/useTheme'
import { emotionQuery } from '@/src/services/queries/emotion/emotion-query'
import { postCountQuery } from '@/src/services/queries/post/post-count-query'
import { userQuery } from '@/src/services/queries/user/user-query'
import { getSignUpDays } from '@/src/utils/client-utils'
import { XStack } from '@/src/components/Stack'
import HistoryBlock from './HistoryBlock'

interface Props {
  userId: string
}

export default function AuthHistory({ userId }: Props) {
  const { color } = useTheme()
  const { data: user } = useSuspenseQuery(userQuery.getUserInfo(userId))
  const { data: postLength } = useSuspenseQuery(
    postCountQuery.countAllMyPost(userId),
  )
  const { data: myAverageEmotion } = useSuspenseQuery(
    emotionQuery.getEmotionAverage(userId),
  )

  return (
    <div className="animate-fade-in">
      <XStack className="sm:gap-8">
        <HistoryBlock
          title="시작한지"
          content={getSignUpDays(user?.createdAt ?? '')}
          unit="일 째"
        />
        <HistoryBlock title="기록" content={postLength} unit="개" />
        <HistoryBlock
          title="평균 감정 농도"
          content={myAverageEmotion}
          className={colorTheme({ color })}
          unit="%"
        />
      </XStack>
    </div>
  )
}

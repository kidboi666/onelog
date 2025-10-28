'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import cn from '@/src/lib/cn/index'
import { colorTheme, useTheme } from '@/src/store/hooks/useTheme'
import { emotionQuery } from '@/src/services/queries/emotion/emotion-query'
import TextDisplay from '@/src/components/TextDisplay'

interface Props {
  userId: string
}

export default function EmotionAverage({ userId }: Props) {
  const { color } = useTheme()
  const { data: myAverageEmotion } = useSuspenseQuery(
    emotionQuery.getEmotionAverage(userId),
  )
  return (
    <div className="absolute -right-3 top-0">
      <TextDisplay
        size="xs"
        className={cn(
          'animate-cta-fadein-out rounded-lg px-1.5 py-1 font-semibold text-white',
          colorTheme({ color }),
          color === 'blue' && 'ring-var-blue/65',
          color === 'orange' && 'ring-var-orange/65',
          color === 'yellow' && 'ring-var-yellow/65',
          color === 'green' && 'ring-var-green/65',
          color === 'black' && 'ring-var-black/65 dark:ring-white/65',
        )}
      >
        {myAverageEmotion}%
      </TextDisplay>
    </div>
  )
}

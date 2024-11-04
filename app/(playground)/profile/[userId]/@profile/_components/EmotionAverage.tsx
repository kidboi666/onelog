import Text from '@/components/shared/Text'
import cn from '@/lib/cn'
import { supabase } from '@/lib/supabase/client'
import { emotionQuery } from '@/services/queries/emotion/emotionQuery'
import { colorTheme, ringTheme, useTheme } from '@/store/useTheme'
import { useSuspenseQuery } from '@tanstack/react-query'

interface Props {
  userId: string
}

export default function EmotionAverage({ userId }: Props) {
  const { color } = useTheme()
  const { data: myAverageEmotion } = useSuspenseQuery(
    emotionQuery.getEmotionAverage(supabase, userId),
  )
  return (
    <div className="absolute -right-3 top-0">
      <Text
        size="xs"
        className={cn(
          'animate-cta-fadein-out rounded-lg px-1.5 py-1 font-semibold text-white',
          colorTheme({ color }),
          ringTheme.width[4],
          ringTheme.color[color],
        )}
      >
        {myAverageEmotion}%
      </Text>
    </div>
  )
}

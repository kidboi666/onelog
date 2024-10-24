import Text from '@/components/shared/Text'
import cn from '@/lib/cn'
import { supabase } from '@/lib/supabase/client'
import { emotionQuery } from '@/services/queries/emotion/emotionQuery'
import { colorTheme, useTheme } from '@/store/useTheme'
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
    <Text
      size="xs"
      className={cn(
        colorTheme({ color }),
        'absolute -right-3 top-0 rounded-lg px-1.5 py-1 text-white shadow-md',
      )}
    >
      {myAverageEmotion}%
    </Text>
  )
}

import { getEmotionAverage } from '@/src/services/supabase/emotion'
import { queryOptions } from '@tanstack/react-query'

export const emotionQuery = {
  getEmotionAverage: (userId: string) =>
    queryOptions({
      queryKey: ['user_emotion_average', userId],
      queryFn: () => getEmotionAverage(userId),
    }),
}

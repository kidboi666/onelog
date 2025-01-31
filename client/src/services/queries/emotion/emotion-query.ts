import { emotionAdapter } from '@/src/adapters/create-client-adapter'
import { queryOptions } from '@tanstack/react-query'

export const emotionQuery = {
  getEmotionAverage: (userId: string) =>
    queryOptions({
      queryKey: ['user_emotion_average', userId],
      queryFn: () => emotionAdapter.getEmotionAverage(userId),
    }),
}

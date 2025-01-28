import { createEmotionAdapter } from '@/src/adapters/index'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const emotionQuery = {
  getEmotionAverage: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: ['user_emotion_average', userId],
      queryFn: () => createEmotionAdapter(supabase).getEmotionAverage(userId),
    }),
}

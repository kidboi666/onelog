import { handleError } from '@/src/services/supabase/helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'

// 주어진 사용자에 대한 감정 평균치 가져오기
export const getEmotionAverage = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { data, error } = await supabase
    .from('post')
    .select('emotion_level')
    .neq('emotion_level', null)
    .eq('user_id', userId)

  handleError(error)

  if (!data || data.length === 0) {
    return 0
  }

  const emotionLevels = data.map((item) =>
    parseEmotionLevel(item.emotion_level),
  )
  return calculateAverage(emotionLevels)
}

// 퍼센티지 제외한 숫자로 형변환 해주는 헬퍼
const parseEmotionLevel = (emotionLevel: string | null): number => {
  if (!emotionLevel) return 0
  return Number(emotionLevel.split('%')[0])
}

// 감정 평균 계산 헬퍼
const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((prev, curr) => prev + curr, 0)
  return Math.floor(sum / numbers.length)
}

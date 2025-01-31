import { handleError } from '@/src/adapters/query-helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { IEmotionBaseAdapter } from '@/src/types/services/index'

export const createSupabaseEmotionAdapter = (
  supabase: SupabaseClient,
): IEmotionBaseAdapter => {
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

  // 주어진 사용자에 대한 감정 평균치 가져오기
  const getEmotionAverage = async (userId: string): Promise<number> => {
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

  return {
    getEmotionAverage,
  }
}

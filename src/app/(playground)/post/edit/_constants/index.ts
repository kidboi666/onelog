import { EmotionLevel } from '@/shared/types/enums/index'

export const INIT_STATUS = { percent: '', color: '' }

export const EMOTION_STATUS = [
  { percent: EmotionLevel['0%'], status: '매우 나쁨' },
  { percent: EmotionLevel['25%'], status: '나쁨' },
  { percent: EmotionLevel['50%'], status: '보통' },
  { percent: EmotionLevel['75%'], status: '좋음' },
  { percent: EmotionLevel['100%'], status: '매우 좋음' },
] as const

export const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']

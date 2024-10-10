export const INIT_STATUS = { percent: '', color: '' }

export const EMOTION_STATUS = [
  { percent: '0%', color: 'bg-white', status: '매우 나쁨' },
  { percent: '25%', color: 'bg-blue-50', status: '나쁨' },
  { percent: '50%', color: 'bg-blue-100', status: '보통' },
  { percent: '75%', color: 'bg-blue-200', status: '좋음' },
  { percent: '100%', color: 'bg-blue-300', status: '매우 좋음' },
] as const

export const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']

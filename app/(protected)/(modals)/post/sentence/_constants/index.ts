export const INIT_STATUS = { percent: '', color: '' }

export const EMOTION_STATUS = [
  { percent: '0%', color: 'bg-white', status: 'Bad' },
  { percent: '25%', color: 'bg-blue-50', status: 'Little' },
  { percent: '50%', color: 'bg-blue-100', status: 'Normal' },
  { percent: '75%', color: 'bg-blue-200', status: 'Nice' },
  { percent: '100%', color: 'bg-blue-300', status: 'Good' },
] as const

export const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']

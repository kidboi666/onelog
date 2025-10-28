'use client'

import { EmotionLevel } from '@/shared/types/enums'
import { cn } from '@/shared/utils/tw-merge'

interface Props {
  emotionLevel: EmotionLevel
  onClick?: () => void
  className?: string
}

const emotionColors: Record<EmotionLevel, string> = {
  [EmotionLevel['0%']]: 'bg-gray-300',
  [EmotionLevel['25%']]: 'bg-blue-400',
  [EmotionLevel['50%']]: 'bg-green-400',
  [EmotionLevel['75%']]: 'bg-yellow-400',
  [EmotionLevel['100%']]: 'bg-red-400',
}

const emotionLabels: Record<EmotionLevel, string> = {
  [EmotionLevel['0%']]: '매우 나쁨',
  [EmotionLevel['25%']]: '나쁨',
  [EmotionLevel['50%']]: '보통',
  [EmotionLevel['75%']]: '좋음',
  [EmotionLevel['100%']]: '매우 좋음',
}

export default function EmotionGauge({ emotionLevel, onClick, className }: Props) {
  const percentage = parseInt(emotionLevel)
  const colorClass = emotionColors[emotionLevel]
  const label = emotionLabels[emotionLevel]

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        'flex flex-col items-center gap-2 rounded-md p-2',
        onClick && 'cursor-pointer hover:bg-accent',
        !onClick && 'cursor-default',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={cn('h-full transition-all', colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </button>
  )
}

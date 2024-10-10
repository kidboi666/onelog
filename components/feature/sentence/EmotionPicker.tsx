'use client'

import cn from '@/lib/cn'
import { EMOTION_STATUS } from '@/app/(protected)/(modals)/post/sentence/_constants'
import Text from '@/components/shared/Text'
import { List } from '@/components/shared/List'
import useStateChange from '@/hooks/useStateChange'

interface Props {
  selectedEmotion: string
  onChangeEmotion: (emotion: string) => void
}

export default function EmotionPicker({
  selectedEmotion,
  onChangeEmotion,
}: Props) {
  return (
    <List className="relative flex items-start justify-between gap-2">
      {EMOTION_STATUS.map((emotion) => (
        <EmotionBlock
          key={emotion.status}
          emotion={emotion}
          selectedEmotion={selectedEmotion}
          onChangeEmotion={onChangeEmotion}
        />
      ))}
    </List>
  )
}

interface EmotionBlockProps {
  emotion: (typeof EMOTION_STATUS)[number]
  onChangeEmotion: (emotion: string) => void
  selectedEmotion?: string
}

function EmotionBlock({
  emotion,
  selectedEmotion,
  onChangeEmotion,
}: EmotionBlockProps) {
  const { open, close, ref, onTransitionEnd } = useStateChange<HTMLDivElement>()
  return (
    <List.Row
      onClick={() => onChangeEmotion(emotion.percent)}
      className="relative flex cursor-pointer justify-center"
    >
      <div
        onClick={() => onChangeEmotion(emotion.percent)}
        className="flex flex-col gap-2 font-medium text-zinc-400 hover:opacity-100"
      >
        <div
          className={cn(
            'size-6 rounded-full bg-zinc-300 transition dark:bg-var-darkgray',
          )}
        />
      </div>
      <div
        ref={ref}
        data-status="closed"
        onTransitionEnd={onTransitionEnd}
        className="hidden"
      >
        <Text type="caption" size="sm" className="absolute top-4">
          {emotion.status}
        </Text>
      </div>
    </List.Row>
  )
}

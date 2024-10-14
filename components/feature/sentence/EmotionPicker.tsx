'use client'

import cn from '@/lib/cn'
import Text from '@/components/shared/Text'
import { List } from '@/components/shared/List'
import useStateChange from '@/hooks/useStateChange'
import { EMOTION_STATUS } from '@/app/(protected)/post/sentence/_constants'
import { RefObject } from 'react'

interface Props {
  selectedEmotion: string
  targetRef: RefObject<HTMLDivElement>
  onChangeEmotion: (emotion: string) => void
  onTransitionEnd: () => void
}

export default function EmotionPicker({
  selectedEmotion,
  onChangeEmotion,
  targetRef,
  onTransitionEnd,
}: Props) {
  return (
    <div
      ref={targetRef}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className="absolute top-[calc(100%--6px)] origin-top-left transition data-[status=closed]:scale-90 data-[status=closed]:opacity-0"
    >
      <List className="flex items-start justify-between gap-2 rounded-md bg-white p-2 shadow-md ring-1 ring-zinc-200 dark:bg-var-dark dark:ring-zinc-700">
        {EMOTION_STATUS.map((emotion) => (
          <EmotionBlock
            key={emotion.status}
            emotion={emotion}
            selectedEmotion={selectedEmotion}
            onChangeEmotion={onChangeEmotion}
          />
        ))}
      </List>
    </div>
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

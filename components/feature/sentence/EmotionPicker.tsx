'use client'

import cn from '@/lib/cn'
import Text from '@/components/shared/Text'
import { List } from '@/components/shared/List'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import { EMOTION_STATUS } from '@/app/(protected)/post/sentence/_constants'
import { RefObject } from 'react'
import { useTheme } from '@/store/useTheme'
import Icon from '@/components/shared/Icon'
import Button from '@/components/shared/Button'

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
      className="absolute bottom-[calc(100%--6px)] hidden origin-top-left transition data-[status=closed]:scale-90 data-[status=closed]:opacity-0"
    >
      <List className="flex items-start justify-between gap-2 rounded-md bg-white p-2 shadow-md ring-1 ring-zinc-200 dark:bg-var-dark dark:ring-zinc-700">
        {EMOTION_STATUS.map((emotion, index) => (
          <EmotionBlock
            key={emotion.status}
            emotion={emotion}
            index={index}
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
  index: number
}

function EmotionBlock({
  emotion,
  selectedEmotion,
  onChangeEmotion,
  index,
}: EmotionBlockProps) {
  const { color } = useTheme()
  let blockOpacity: string
  switch (index) {
    case 0:
      blockOpacity = 'opacity-20'
      break
    case 1:
      blockOpacity = 'opacity-40'
      break
    case 2:
      blockOpacity = 'opacity-60'
      break
    case 3:
      blockOpacity = 'opacity-80'
      break
    case 4:
      blockOpacity = 'opacity-100'
      break
    default:
      break
  }
  return (
    <List.Row
      onClick={() => onChangeEmotion(emotion.percent)}
      className="relative flex cursor-pointer justify-center"
    >
      <div
        onClick={() => onChangeEmotion(emotion.percent)}
        className="relative flex flex-col gap-2 font-medium text-zinc-400 hover:opacity-100"
      >
        <div
          className={cn(
            'flex size-6 items-center justify-center rounded-full bg-zinc-300 text-white transition dark:bg-var-darkgray',
            blockOpacity!,
            color === 'yellow' && 'bg-var-yellow dark:bg-var-yellow',
            color === 'orange' && 'bg-var-orange dark:bg-var-orange',
            color === 'black' && 'bg-black/60 dark:bg-white/60',
            color === 'blue' && 'bg-var-blue dark:bg-var-blue',
            color === 'green' && 'bg-var-green dark:bg-var-green',
          )}
        />
        {selectedEmotion === emotion.percent && (
          <Icon
            view="0 -960 960 960"
            size={18}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </Icon>
        )}
      </div>
    </List.Row>
  )
}

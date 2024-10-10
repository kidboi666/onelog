import Text from '@/components/shared/Text'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
  emotionLevel?: string
}

export default function EmotionDropDown({
  targetRef,
  onTransitionEnd,
  emotionLevel,
}: Props) {
  let emotionState: string

  switch (emotionLevel) {
    case '0%':
      emotionState = '매우 나쁨'
      break
    case '25%':
      emotionState = '나쁨'
      break
    case '50%':
      emotionState = '보통'
      break
    case '75%':
      emotionState = '좋음'
      break
    case '100%':
      emotionState = '매우 좋음'
      break
    default:
      break
  }

  return (
    <div
      ref={targetRef}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className="absolute -bottom-full right-0 z-30 hidden origin-top-right rounded-md bg-white p-2 shadow-md transition data-[status=closed]:scale-90 data-[status=closed]:opacity-0 dark:bg-var-darkgray"
    >
      <Text size="sm">감정 상태 : {emotionState!}</Text>
    </div>
  )
}

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
  return (
    <div
      ref={targetRef}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className="absolute -bottom-full right-0 hidden origin-bottom-right rounded-md bg-white p-2 shadow-md transition data-[status=closed]:scale-90 data-[status=closed]:opacity-0 dark:bg-var-dark"
    >
      <Text size="sm">감정 농도 : {emotionLevel}</Text>
    </div>
  )
}

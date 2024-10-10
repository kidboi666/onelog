import Text from '@/components/shared/Text'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  accessType?: string | null
  onTransitionEnd: () => void
}

export default function SentenceAccessTypeDropDown({
  targetRef,
  accessType,
  onTransitionEnd,
}: Props) {
  return (
    <div
      ref={targetRef}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className="absolute bottom-full right-0 z-30 hidden origin-top-right rounded-md bg-white p-2 shadow-md transition data-[status=closed]:scale-90 data-[status=closed]:opacity-0 dark:bg-var-dark"
    >
      <Text size="sm">
        게시 여부 : {accessType === 'public' ? '공개' : '비공개'}
      </Text>
    </div>
  )
}

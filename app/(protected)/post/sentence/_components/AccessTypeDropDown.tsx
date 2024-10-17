import { DropDown } from '@/components/shared/DropDown'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
  onClick: (order: 'private' | 'public') => void
}

export default function AccessTypeDropDown({
  targetRef,
  onTransitionEnd,
  onClick,
}: Props) {
  return (
    <DropDown.Wrapper
      initStatus="closed"
      ref={targetRef}
      onTransitionEnd={onTransitionEnd}
      className="w-20"
    >
      <DropDown.Button onClick={() => onClick('public')}>공개</DropDown.Button>
      <DropDown.Button onClick={() => onClick('private')}>
        비공개
      </DropDown.Button>
    </DropDown.Wrapper>
  )
}

import Container from '@/components/shared/Container'
import RefContainer from '@/components/shared/RefContainer'
import Title from '@/components/shared/Title'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
}

export default function TaskOptionDropDown({
  targetRef,
  onTransitionEnd,
}: Props) {
  return (
    <RefContainer
      ref={targetRef}
      dataStatus="closed"
      isBackground
      isRounded
      onTransitionEnd={onTransitionEnd}
      className="data-slideDown status-slideDown absolute right-0 top-full origin-top-right"
    >
      <Title>asdf</Title>
    </RefContainer>
  )
}

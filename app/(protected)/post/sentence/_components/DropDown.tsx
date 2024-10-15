import Button from '@/components/shared/Button'
import { List } from '@/components/shared/List'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLUListElement>
  onTransitionEnd: () => void
  onClick: (order: 'private' | 'public') => void
}

export default function DropDown({
  targetRef,
  onTransitionEnd,
  onClick,
}: Props) {
  return (
    <List
      targetRef={targetRef}
      onTransitionEnd={onTransitionEnd}
      isRounded
      isBackground
      dataStatus="closed"
      className="absolute bottom-[calc(100%--6px)] hidden w-20 origin-top overflow-hidden shadow-md ring-1 ring-zinc-200 transition data-[status=closed]:scale-90 data-[status=closed]:opacity-0 dark:ring-zinc-700"
    >
      <List.Row onClick={() => onClick('public')} className="w-full">
        <Button variant="list" size="sm" className="w-full">
          공개
        </Button>
      </List.Row>
      <List.Row onClick={() => onClick('private')} className="w-full">
        <Button variant="list" size="sm" className="w-full">
          비공개
        </Button>
      </List.Row>
    </List>
  )
}

import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import { MouseEvent, RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLUListElement>
  onTransitionEnd: () => void
}

export default function SentenceOptionsDropDown({
  targetRef,
  onTransitionEnd,
}: Props) {
  const handleReportClick = (e: MouseEvent) => {
    e.stopPropagation()
    // 신고 로직
  }

  return (
    <List
      targetRef={targetRef}
      dataStatus="closed"
      onTransitionEnd={onTransitionEnd}
      className="absolute bottom-full right-0 z-30 hidden w-28 origin-bottom-right rounded-md bg-white shadow-md transition data-[status=closed]:scale-90 data-[status=closed]:opacity-0 dark:bg-var-dark"
    >
      <List.Row className="w-full">
        <Button
          onClick={handleReportClick}
          variant="list"
          size="sm"
          className="w-full gap-2"
        >
          <Icon view="0 -960 960 960" size={18}>
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
          </Icon>
          신고하기
        </Button>
      </List.Row>
    </List>
  )
}

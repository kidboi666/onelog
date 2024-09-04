import Button from '@/components/shared/Button'

import { List } from '@/components/shared/List'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLUListElement>
  onClick: (order: 'emotion' | 'length') => void
}

export default function GardenSortDropDown({ targetRef, onClick }: Props) {
  return (
    <List
      targetRef={targetRef}
      dataStatus="closed"
      className="data-slideDown status-slideDown absolute right-0 top-full hidden h-fit w-40 origin-top-right rounded-md border border-gray-200 bg-white shadow-md"
    >
      <List.Row>
        <Button
          variant="list"
          onClick={() => onClick('emotion')}
          className="w-full"
        >
          감정 농도 평균
        </Button>
      </List.Row>
      <List.Row>
        <Button
          variant="list"
          onClick={() => onClick('length')}
          className="w-full"
        >
          작성한 문장 갯수
        </Button>
      </List.Row>
    </List>
  )
}

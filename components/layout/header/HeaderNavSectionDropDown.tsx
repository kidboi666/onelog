import LinkButton from '@/components/shared/LinkButton'
import { List } from '@/components/shared/List'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLUListElement>
}

export default function HeaderNavSectionDropDown({ targetRef }: Props) {
  return (
    <List
      targetRef={targetRef}
      dataStatus="closed"
      className="data-slideDown status-slideDown absolute right-0 top-[calc(100%--4px)] hidden h-fit w-40 origin-top-right overflow-hidden rounded-md border border-gray-200 shadow-md dark:border-gray-600"
    >
      <List.Row>
        <LinkButton href="/mypage" variant="list" className="w-full">
          마이 페이지
        </LinkButton>
      </List.Row>
      <List.Row>
        <LinkButton href="/settings" variant="list" className="w-full">
          환경 설정
        </LinkButton>
      </List.Row>
    </List>
  )
}

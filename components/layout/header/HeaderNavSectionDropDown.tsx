import Button from '@/components/shared/Button'
import LinkButton from '@/components/shared/LinkButton'
import { List } from '@/components/shared/List'
import { RefObject } from 'react'

interface Props {
  signOut: () => void
  targetRef: RefObject<HTMLUListElement>
}

export default function HeaderNavSectionDropDown({
  targetRef,
  signOut,
}: Props) {
  return (
    <List
      targetRef={targetRef}
      dataStatus="closed"
      className="data-slideDown status-slideDown absolute right-0 top-full hidden h-fit w-40 origin-top-right rounded-md border border-gray-200 bg-white shadow-md"
    >
      <List.Row>
        <LinkButton href="/mypage" variant="list" className="w-full">
          마이 페이지
        </LinkButton>
      </List.Row>
      <List.Row>
        <Button variant="list" onClick={() => signOut()} className="w-full">
          로그아웃
        </Button>
      </List.Row>
    </List>
  )
}

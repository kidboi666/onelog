import Button from '@/components/shared/Button'
import LinkButton from '@/components/shared/LinkButton'
import { List } from '@/components/shared/List'
import { RefObject } from 'react'

interface Props {
  signOut: () => void
  targetRef: RefObject<HTMLUListElement>
}

export default function HeaderDropDown({ signOut, targetRef }: Props) {
  return (
    <List
      targetRef={targetRef}
      className="absolute right-0 top-full h-fit w-40 border border-gray-200 bg-white shadow-md"
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

import Box from '@/components/shared/Box'
import LinkButton from '@/components/shared/LinkButton'
import RefContainer from '@/components/shared/RefContainer'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
}

export default function HeaderNavSectionDropDown({
  targetRef,
  onTransitionEnd,
}: Props) {
  return (
    <RefContainer
      ref={targetRef}
      dataStatus="closed"
      isRounded
      isBackground
      onTransitionEnd={onTransitionEnd}
      className="data-slideDown status-slideDown absolute right-0 top-[calc(100%--4px)] hidden h-fit w-40 origin-top-right overflow-hidden shadow-md"
    >
      <Box className="sm:hidden">
        <LinkButton href="/post" variant="list" className="w-full">
          글쓰기
        </LinkButton>
        <LinkButton href="/post/sentence" variant="list">
          한줄쓰기
        </LinkButton>
      </Box>
      <LinkButton href="/mypage" variant="list" className="w-full">
        마이 페이지
      </LinkButton>
      <LinkButton href="/settings" variant="list" className="w-full">
        환경 설정
      </LinkButton>
      <LinkButton href="/todo" variant="list" className="w-full">
        할일 관리
      </LinkButton>
    </RefContainer>
  )
}

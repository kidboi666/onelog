import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import LinkButton from '@/components/shared/LinkButton'
import RefContainer from '@/components/shared/RefContainer'
import Image from 'next/image'
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
      <Box>
        <Button variant="secondary" className="text-var-black">
          <Icon size={50} view={150} className="text-red-700">
            <g id="profile">
              <circle cx="73.5" cy="52.5" r="18" />
              <path d="M111,115.5c0-20.56-16.12-31.5-36-31.5s-36,10.94-36,31.5" />
            </g>
          </Icon>
        </Button>
      </Box>
      <Box className="sm:hidden">
        <LinkButton href="/post" variant="list" className="w-full">
          글쓰기
        </LinkButton>
        <LinkButton href="/post/sentence" variant="list">
          한줄쓰기
        </LinkButton>
      </Box>
      <LinkButton href="/todo" variant="list" className="w-full">
        할일 관리
      </LinkButton>
      <LinkButton href="/mypage" variant="list" className="w-full">
        마이 페이지
      </LinkButton>
      <LinkButton href="/settings" variant="list" className="w-full">
        환경 설정
      </LinkButton>
    </RefContainer>
  )
}

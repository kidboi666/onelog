import { RefObject } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import useSignOut from '@/services/mutates/auth/useSignOut'
import { meQuery } from '@/services/queries/auth/meQuery'
import Title from '@/components/shared/Title'
import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import LinkButton from '@/components/shared/LinkButton'
import RefContainer from '@/components/shared/RefContainer'
import Text from '@/components/shared/Text'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
}

export default function HeaderNavSectionDropDown({
  targetRef,
  onTransitionEnd,
}: Props) {
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.userId),
  )
  const { mutate: signOut } = useSignOut()
  const validateEmail = me?.email?.split('@')[0]
  return (
    <RefContainer
      ref={targetRef}
      dataStatus="closed"
      isRounded
      isBackground
      onTransitionEnd={onTransitionEnd}
      className="data-slideDown status-slideDown absolute right-0 top-[calc(100%--4px)] hidden h-fit w-60 origin-top-right overflow-hidden shadow-md"
    >
      <LinkButton
        href="/mypage"
        variant="list"
        className="flex"
        innerClassName="flex gap-2"
      >
        <Avatar src={me?.avatar_url} size="sm" ring="xs" shadow="sm" />
        <Box col className="items-start">
          <Title size="xs">{me?.user_name}</Title>
          <Text type="caption" size="sm">
            @{validateEmail}
          </Text>
          <Box row className="gap-2">
            <Text size="sm">마이 페이지 가기</Text>
            <Box row className="items-center text-gray-500 dark:text-white">
              <Icon view={150} size={10}>
                <g id="forward">
                  <path d="M16.09,142.64c-2.36-10.16-3.01-21.3-.9-32.59,2.08-11.27,6.82-22.55,13.82-32.64,6.99-10.11,16.1-19.07,26.87-26.32,5.39-3.63,11.23-6.81,17.55-9.46,6.33-2.64,13.15-4.75,20.67-5.99v58c-2.67-1.19-6.02-2.04-9.63-2.48-3.62-.43-7.52-.48-11.48-.08-7.94.78-16.17,3.15-23.83,7.19-7.67,4.04-14.8,9.82-20.58,17.36-5.78,7.52-10.01,16.82-12.48,27.01Z" />
                  <polygon points="70.09 125.86 70.09 7.36 136.09 66.61 70.09 125.86" />
                </g>
              </Icon>
            </Box>
          </Box>
        </Box>
      </LinkButton>
      <Box className="sm:hidden">
        <LinkButton href="/post" variant="list">
          글쓰기
        </LinkButton>
        <LinkButton href="/post/sentence" variant="list">
          한줄쓰기
        </LinkButton>
      </Box>
      <LinkButton href="/todo" variant="list">
        할일 관리
      </LinkButton>
      <LinkButton href="/settings" variant="list">
        설정
      </LinkButton>
      <Button onClick={() => signOut()} variant="list" className="w-full">
        로그아웃
      </Button>
    </RefContainer>
  )
}

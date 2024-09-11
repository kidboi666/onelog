'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import Button from '@/components/shared/Button'
import LinkButton from '@/components/shared/LinkButton'
import HeaderNavSectionDropDown from './HeaderNavSectionDropDown'
import Container from '@/components/shared/Container'
import Box from '@/components/shared/Box'
import Avatar from '@/components/feature/user/Avatar'

export default function HeaderNavSection() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const {
    ref: dropdownRef,
    close,
    onClick,
    onTransitionEnd,
  } = useStateChange<HTMLDivElement>()
  const dropdownButtonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <Container as="nav" className="relative flex gap-2">
      <Box className="flex gap-2 max-sm:hidden">
        <LinkButton href="/post">글쓰기</LinkButton>
        <LinkButton
          href="/post/sentence"
          variant="secondary"
          className="text-nowrap"
        >
          한줄쓰기
        </LinkButton>
      </Box>
      {me && (
        <Button
          variant="emptyStyle"
          ref={dropdownButtonRef}
          onClick={onClick}
          className="p-0"
        >
          <Avatar src={me.avatar_url} size="sm" ring="xs" />
        </Button>
      )}
      <HeaderNavSectionDropDown
        onTransitionEnd={onTransitionEnd}
        targetRef={dropdownRef}
      />
    </Container>
  )
}

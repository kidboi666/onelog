'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import LinkButton from '@/components/shared/LinkButton'
import HeaderNavSectionDropDown from './HeaderNavSectionDropDown'
import Container from '@/components/shared/Container'
import Box from '@/components/shared/Box'
import { wait } from '@/utils/wait'

export default function HeaderNavSection() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [dropdownRef, open, closed] = useStateChange<HTMLDivElement>()
  const dropdownButtonRef = useOutsideClick<HTMLButtonElement>(closed)

  const handleOpenStateChange = async () => {
    const isOpen = dropdownRef.current?.getAttribute('data-status')

    if (isOpen === 'opened') {
      closed()
    }

    if (isOpen === 'closed') {
      dropdownRef.current?.classList.remove('hidden')
      await wait(0)
      open()
    }
  }

  const handleTransitionEnd = () => {
    if (dropdownRef?.current?.getAttribute('data-status') === 'closed') {
      dropdownRef.current.classList.add('hidden')
    }
  }

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
          variant="secondary"
          ref={dropdownButtonRef}
          onClick={handleOpenStateChange}
          className="px-2"
        >
          <Icon className="size-5 rotate-90">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 12.5a2.5 2.5 0 11-5.001-.001A2.5 2.5 0 017 12.5zm7.5 0a2.5 2.5 0 11-5.001-.001 2.5 2.5 0 015.001.001zm7.5 0a2.5 2.5 0 11-5.001-.001A2.5 2.5 0 0122 12.5z"
              fill="currentColor"
            />
          </Icon>
        </Button>
      )}
      <HeaderNavSectionDropDown
        onTransitionEnd={handleTransitionEnd}
        targetRef={dropdownRef}
      />
    </Container>
  )
}

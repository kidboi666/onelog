'use client'

import { MouseEvent } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'

import useSignOut from '@/services/mutates/auth/useSignOut'
import { meQuery } from '@/services/queries/auth/meQuery'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import LinkButton from '@/components/shared/LinkButton'
import HeaderNavSectionDropDown from './HeaderNavSectionDropDown'
import { supabase } from '@/lib/supabase/client'

export default function HeaderNavSection() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: signOut } = useSignOut()
  const [dropdownRef, open, closed] = useStateChange<HTMLUListElement>()
  const dropdownButtonRef = useOutsideClick<HTMLButtonElement>(closed)

  const handleOpenStateChange = () => {
    const isOpen = dropdownRef.current?.getAttribute('data-status')

    if (isOpen === 'opened') {
      closed()
    }

    if (isOpen === 'closed') {
      dropdownRef.current?.classList.remove('hidden')
      open()
    }
  }

  return (
    <nav className="relative flex gap-2">
      {me ? (
        <LinkButton href="/write">글쓰기</LinkButton>
      ) : (
        <LinkButton href="/signin">시작하기</LinkButton>
      )}
      {me && (
        <Button
          variant="secondary"
          ref={dropdownButtonRef}
          onClick={handleOpenStateChange}
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
      <HeaderNavSectionDropDown targetRef={dropdownRef} signOut={signOut} />
    </nav>
  )
}

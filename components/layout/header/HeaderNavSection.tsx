'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import useSignOut from '@/services/mutates/auth/useSignOut'
import { meQuery } from '@/services/queries/auth/meQuery'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import LinkButton from '@/components/shared/LinkButton'
import HeaderDropDown from './HeaderDropDown'
import useOutsideClick from '@/hooks/useOutsideClick'

export default function HeaderNavSection() {
  const supabase = createBrowserClient()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: signOut } = useSignOut()
  const [isOpen, setOpen] = useState(false)
  const targetRef = useOutsideClick<HTMLUListElement>(() =>
    setOpen((prev) => !prev),
  )
  return (
    <nav className="relative flex gap-2">
      {me ? (
        <LinkButton href="/write">글쓰기</LinkButton>
      ) : (
        <LinkButton href="/signin">시작하기</LinkButton>
      )}
      {me && (
        <Button variant="secondary" onClick={() => setOpen((prev) => !prev)}>
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
      {isOpen && <HeaderDropDown targetRef={targetRef} signOut={signOut} />}
    </nav>
  )
}

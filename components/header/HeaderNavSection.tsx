'use client'

import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import LinkButton from '@/components/shared/LinkButton'
import { List } from '@/components/shared/List'
import { createBrowserClient } from '@/lib/supabase/client'
import useSignOut from '@/services/mutates/auth/useSignOut'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function HeaderNavSection() {
  const [isOpen, setOpen] = useState(false)
  const supabase = createBrowserClient()
  const { mutate: signOut } = useSignOut()
  const { data: me } = useQuery(meQuery.getUserInfo(supabase))

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
      {isOpen && (
        <List className="absolute right-0 top-full h-fit w-40 border border-gray-200 bg-white shadow-md">
          <List.Row>
            <LinkButton href="/user" variant="list" className="w-full">
              마이 페이지
            </LinkButton>
          </List.Row>
          <List.Row>
            <Button variant="list" onClick={() => signOut()} className="w-full">
              로그아웃
            </Button>
          </List.Row>
        </List>
      )}
    </nav>
  )
}

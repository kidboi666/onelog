'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import Button from '@/components/shared/Button'
import LinkButton from '@/components/shared/LinkButton'
import HeaderNavSectionDropDown from './HeaderNavSectionDropDown'
import Avatar from '@/components/feature/user/Avatar'
import { Suspense } from 'react'
import Spinner from '@/components/shared/Spinner'
import Icon from '@/components/shared/Icon'

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
    <nav className="relative flex gap-2">
      <div className="flex max-sm:hidden">
        <LinkButton
          href="/post"
          variant="list"
          innerClassName="py-2 flex gap-2"
        >
          <Icon view="0 -960 960 960" size={18}>
            <path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z" />
          </Icon>
        </LinkButton>
        <LinkButton
          href="/post/sentence"
          variant="list"
          innerClassName="py-2 flex gap-2"
        >
          <Icon view="0 -960 960 960" size={18}>
            <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
          </Icon>
        </LinkButton>{' '}
        <LinkButton
          href="/todo/main"
          variant="list"
          innerClassName="py-2 flex gap-2"
        >
          <Icon view="0 -960 960 960" size={18}>
            <path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z" />
          </Icon>
        </LinkButton>
      </div>
      <Suspense fallback={<Spinner size={40} />}>
        <Button
          variant="emptyStyle"
          ref={dropdownButtonRef}
          onClick={onClick}
          className="p-0"
        >
          <Avatar src={me?.avatar_url} size="sm" ring="xs" shadow="sm" />
        </Button>
      </Suspense>

      <HeaderNavSectionDropDown
        onTransitionEnd={onTransitionEnd}
        targetRef={dropdownRef}
      />
    </nav>
  )
}

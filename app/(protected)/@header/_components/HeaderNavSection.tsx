'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import Button from '@/components/shared/Button'
import HeaderNavSectionDropDown from './HeaderNavSectionDropDown'
import Avatar from '@/components/feature/user/Avatar'
import { Suspense } from 'react'
import Spinner from '@/components/shared/Spinner'
import { HEADER_MENU } from '../_constants'
import HeaderMenu from './HeaderMenu'

export default function HeaderNavSection() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const {
    ref: dropdownRef,
    close,
    onClick,
    open,
    onTransitionEnd,
  } = useStateChange<HTMLDivElement>()
  const dropdownButtonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <nav className="relative flex gap-2">
      <div className="flex max-sm:hidden">
        {HEADER_MENU.map((menu) => (
          <HeaderMenu key={menu.id} menu={menu} />
        ))}
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
        open={open}
        targetRef={dropdownRef}
      />
    </nav>
  )
}

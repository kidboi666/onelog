'use client'

import { RefObject } from 'react'
import Line from '@/components/shared/Line'
import { List } from '@/components/shared/List'
import { usePathname } from 'next/navigation'
import {
  BOTTOM_NAVIGATE_MENUS,
  TOP_NAVIGATE_MENUS,
} from '../../@sidebar/_constants/Navigate'
import MenuButton from '../../@sidebar/_components/MenuButton'
import AvatarSection from './AvatarSection'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
}

export default function MobileMenu({ targetRef, onTransitionEnd }: Props) {
  const pathname = usePathname()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  return (
    <div
      ref={targetRef}
      onTransitionEnd={onTransitionEnd}
      data-status="closed"
      className="absolute left-0 top-[calc(100%--8px)] z-30 hidden h-[calc(100dvh-88px)] w-full origin-top gap-2 rounded-lg bg-white p-2 shadow-md transition duration-300 ease-in-out data-[status=closed]:-translate-y-4 data-[status=closed]:opacity-0 dark:bg-var-darkgray"
    >
      <div className="flex h-full flex-col">
        <List className="flex flex-1 flex-col gap-2">
          {TOP_NAVIGATE_MENUS.map((menu) => (
            <MenuButton
              key={menu.id}
              isSelected={pathname === menu.path}
              isOpen
              icon={menu.icon}
              name={menu.name}
              path={menu.path}
            />
          ))}
        </List>
        <Line className="my-2" />
        <List className="flex flex-col gap-2">
          {BOTTOM_NAVIGATE_MENUS.map((menu) => (
            <MenuButton
              key={menu.id}
              isSelected={pathname === menu.path}
              isOpen
              icon={menu.icon}
              name={menu.name}
              path={menu.path}
            />
          ))}
        </List>
        <Line className="my-2" />
        <AvatarSection
          userId={me?.userId}
          avatarUrl={me?.avatar_url}
          email={me?.email}
        />
      </div>
    </div>
  )
}

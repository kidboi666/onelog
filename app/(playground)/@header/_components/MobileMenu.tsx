'use client'

import { RefObject } from 'react'
import Line from '@/components/shared/Line'
import { List } from '@/components/shared/List'
import { usePathname } from 'next/navigation'
import {
  AUTH_NAVIGATE_MENUS,
  BOTTOM_NAVIGATE_MENUS,
  TOP_NAVIGATE_MENUS,
} from '../../@sidebar/_constants/Navigate'
import MenuButton from '../../@sidebar/_components/MenuButton'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import AuthButtonWithDropDown from '../../@sidebar/_components/AuthButtonWithDropDown'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  close: () => void
  onTransitionEnd: () => void
}

export default function MobileMenu({
  targetRef,
  close,
  onTransitionEnd,
}: Props) {
  const pathname = usePathname()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  return (
    <>
      <div
        ref={targetRef}
        onTransitionEnd={onTransitionEnd}
        data-status="closed"
        className="fixed -left-2 -top-2 z-50 hidden h-dvh w-3/4 origin-left gap-2 rounded-r-lg bg-white p-2 shadow-md transition duration-300 ease-in-out data-[status=closed]:-translate-x-full dark:bg-var-darkgray"
      >
        <div className="flex h-full flex-col">
          <Button
            variant="icon"
            onClick={close}
            size="md"
            className="flex w-fit items-start justify-start sm:hidden"
          >
            <Icon view="0 -960 960 960" size={18}>
              <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
            </Icon>
          </Button>
          <Line className="my-2" />
          <List className="flex flex-1 flex-col gap-2">
            {TOP_NAVIGATE_MENUS.map((menu) => (
              <MenuButton
                viewText
                key={menu.id}
                isSelected={pathname === menu.path}
                icon={menu.icon}
                name={menu.name}
                path={menu.path}
              />
            ))}
          </List>
          <List className="flex flex-col gap-2">
            {BOTTOM_NAVIGATE_MENUS.map((menu) => (
              <MenuButton
                viewText
                key={menu.id}
                isSelected={pathname === menu.path}
                icon={menu.icon}
                name={menu.name}
                path={menu.path}
              />
            ))}
          </List>
          <Line className="my-2" />
          {me ? (
            <AuthButtonWithDropDown
              viewText
              me={me}
              pathname={pathname.split('/')[1]}
              userId={pathname.split('/')[2]}
            />
          ) : (
            <List>
              {AUTH_NAVIGATE_MENUS.map((menu) => (
                <MenuButton
                  key={menu.id}
                  isSelected={pathname === menu.path}
                  icon={menu.icon}
                  name={menu.name}
                  path={menu.path}
                />
              ))}
            </List>
          )}
        </div>
      </div>
    </>
  )
}

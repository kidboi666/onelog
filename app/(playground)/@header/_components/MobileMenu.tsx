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
            <Icon view="0 -960 960 960" size={24}>
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
                  viewText
                  key={menu.id}
                  isSelected={pathname === menu.path}
                  icon={menu.icon}
                  name={menu.name}
                  path={menu.path}
                />
              ))}
            </List>
          )}
          <Line className="my-2" />
          <Button variant="icon" className="w-fit gap-2" disabled>
            <Icon view="0 0 336 344" size={30}>
              <ellipse cx="83" cy="323" rx="83" ry="21" fill="#D9D9D9" />
              <path d="M83 322.994L197.5 77C226 12 301 9.99998 335.5 20.9999C309.9 26.4867 244.333 159.307 221.432 221.111C206.547 227.452 175.468 234.026 161.789 236.52C180.627 236.946 204.296 234.084 213.776 232.599C215.388 235.864 211.839 245.619 184.749 258.515C143.16 261.651 113.159 289.745 103.5 302.866C103.5 302.866 112.5 303 118 304C123.5 305 97.0341 316.047 97.0341 316.047L165.5 322.994L83 322.994Z" />
            </Icon>
            하루한줄 2024
          </Button>
        </div>
      </div>
    </>
  )
}

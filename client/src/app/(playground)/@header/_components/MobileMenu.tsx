'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { RefObject } from 'react'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import Line from '@/src/components/Line'
import { List } from '@/src/components/List'
import { YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
import AuthButtonWithDropDown from '../../@sidebar/_components/AuthButtonWithDropDown'
import MenuButton from '../../@sidebar/_components/MenuButton'
import {
  AUTH_NAVIGATE_MENUS,
  BOTTOM_NAVIGATE_MENUS,
  TOP_NAVIGATE_MENUS,
} from '../../@sidebar/_constants/Navigate'
import MobileWriteButtonWithLogo from './MobileWriteButtonWithLogo'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  close: () => void
  onTransitionEnd: () => void
  isOpen: boolean
}

export default function MobileMenu({
  targetRef,
  close,
  onTransitionEnd,
  isOpen,
}: Props) {
  const pathname = usePathname()
  const { data: session } = useQuery(meQuery.getSession(supabase))
  const { data: me } = useQuery(meQuery.getUserInfo(supabase, session?.id))

  return (
    <>
      <div
        ref={targetRef}
        onTransitionEnd={onTransitionEnd}
        data-status="closed"
        className="fixed left-0 top-0 z-50 h-dvh w-3/4 origin-left gap-2 rounded-r-lg bg-white p-2 shadow-md transition duration-300 ease-in-out data-[status=closed]:-translate-x-full dark:bg-var-darkgray"
      >
        <YStack className="h-full">
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
          <MobileWriteButtonWithLogo
            closeMenu={close}
            isSelected={pathname === '/write'}
          />
          <List className="flex flex-1 flex-col gap-2">
            {TOP_NAVIGATE_MENUS.map((menu) => (
              <List.Row key={menu.id}>
                <MenuButton
                  viewText
                  isSelected={pathname === menu.path}
                  close={close}
                  icon={menu.icon}
                  name={menu.name}
                  path={menu.path}
                />
              </List.Row>
            ))}
          </List>
          <List className="flex flex-col gap-2">
            {BOTTOM_NAVIGATE_MENUS.map((menu) => (
              <List.Row key={menu.id}>
                <MenuButton
                  viewText
                  key={menu.id}
                  isSelected={pathname === menu.path}
                  icon={menu.icon}
                  name={menu.name}
                  close={close}
                  path={menu.path}
                />
              </List.Row>
            ))}
          </List>
          <Line className="my-2" />
          {me ? (
            <AuthButtonWithDropDown
              viewText
              email={me.email}
              meId={me.id}
              avatarUrl={me.avatarUrl}
              userName={me.userName}
              closeMenu={close}
              pathname={pathname.split('/')[1]}
              userId={pathname.split('/')[2]}
            />
          ) : (
            <List>
              {AUTH_NAVIGATE_MENUS.map((menu) => (
                <List.Row key={menu.id}>
                  <MenuButton
                    viewText
                    key={menu.id}
                    isSelected={pathname === menu.path}
                    icon={menu.icon}
                    name={menu.name}
                    close={close}
                    path={menu.path}
                  />
                </List.Row>
              ))}
            </List>
          )}
          <YStack gap={4} className="my-4 items-center">
            <TextDisplay type="caption" size="sm">
              © 2024 One-Sentence. All rights reserved.
            </TextDisplay>
          </YStack>
        </YStack>
      </div>
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 top-0 z-20 h-dvh w-full"
          onClick={close}
        />
      )}
    </>
  )
}

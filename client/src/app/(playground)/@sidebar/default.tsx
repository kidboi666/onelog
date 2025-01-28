'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { ROUTES } from '@/src/routes'
import Line from '@/src/components/Line'
import { YStack, ZStack } from '@/src/components/Stack'
import ToolTip from '@/src/components/Tooltip'
import ThemeToggleButton from '../@header/_components/ThemeToggleButton'
import AuthButtonWithDropDown from './_components/AuthButtonWithDropDown'
import MenuButton from './_components/MenuButton'
import SidebarWriteButtonWithLogo from './_components/SidebarWriteButtonWithLogo'
import {
  BOTTOM_NAVIGATE_MENUS,
  TOP_NAVIGATE_MENUS,
} from './_constants/Navigate'

export default function Sidebar() {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: me } = useQuery(meQuery.getUserInfo(supabase, session?.id))
  const [isHover, setHover] = useState(false)
  const pathname = usePathname()

  const handleToolTipOpen = () => {
    setHover(true)
  }

  const handleToolTipClose = () => {
    setHover(false)
  }

  return (
    <div
      onMouseEnter={handleToolTipOpen}
      onMouseLeave={handleToolTipClose}
      data-status="closed"
      className="fixed bottom-4 z-40 m-4 hidden h-fit w-[64px] flex-shrink-0 rounded-lg bg-white p-2 shadow-md transition-all duration-300 ease-in-out sm:block lg:top-[calc(50%-80px)] lg:-translate-y-1/2 dark:bg-var-darkgray"
    >
      <YStack as="nav">
        <ZStack>
          <SidebarWriteButtonWithLogo
            closeToolTip={handleToolTipClose}
            isSelected={pathname === ROUTES.POST.NEW}
          />
          <ToolTip position="right" size="sm" isHover={isHover} text="글쓰기" />
        </ZStack>
        <Line />
        <YStack className="size-full">
          {TOP_NAVIGATE_MENUS.map((menu) => (
            <ZStack key={menu.id}>
              <MenuButton
                isSelected={
                  pathname === menu.path ||
                  pathname.split('/')[1] === menu.path.split('/')[1]
                }
                icon={menu.icon}
                name={menu.name}
                path={menu.path}
                closeToolTip={handleToolTipClose}
              />
              <ToolTip
                position="right"
                size="sm"
                isHover={isHover}
                text={menu.toolTip}
              />
            </ZStack>
          ))}
        </YStack>
        <YStack>
          {BOTTOM_NAVIGATE_MENUS.map((menu) => (
            <ZStack key={menu.id}>
              <MenuButton
                isSelected={pathname === menu.path}
                icon={menu.icon}
                name={menu.name}
                path={menu.path}
                closeToolTip={handleToolTipClose}
              />
              <ToolTip
                position="right"
                size="sm"
                isHover={isHover}
                text={menu.toolTip}
              />
            </ZStack>
          ))}
          <ZStack>
            <ThemeToggleButton />
            <ToolTip
              position="right"
              size="sm"
              isHover={isHover}
              text="테마 버튼"
            />
          </ZStack>
          <Line className="mb-2" />
          <ZStack>
            <AuthButtonWithDropDown
              pathname={pathname.split('/')[1]}
              userId={pathname.split('/')[2] || ''}
              meId={session?.id}
              userName={me?.userName}
              avatarUrl={me?.avatarUrl}
              email={me?.email}
            />
            <ToolTip
              position="right"
              size="sm"
              isHover={isHover}
              text={me ? me.email : '게스트'}
            />
          </ZStack>
        </YStack>
      </YStack>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Line from '@/components/shared/Line'
import MenuButton from './_components/MenuButton'
import {
  BOTTOM_NAVIGATE_MENUS,
  TOP_NAVIGATE_MENUS,
} from './_constants/Navigate'
import { usePathname } from 'next/navigation'
import ThemeToggleButton from '../@header/_components/ThemeToggleButton'
import AuthButtonWithDropDown from './_components/AuthButtonWithDropDown'
import ToolTip from '@/components/shared/Tooltip'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'
import SidebarWriteButtonWithLogo from './_components/SidebarWriteButtonWithLogo'
import { Container } from '@/components/shared/Container'
import { YStack, ZStack } from '@/components/shared/Stack'

export default function Sidebar() {
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.userId),
  )
  const [isHover, setHover] = useState(false)
  const pathname = usePathname()

  const handleToolTipOpen = () => {
    setHover(true)
  }

  const handleToolTipClose = () => {
    setHover(false)
  }

  return (
    <Container
      onMouseEnter={handleToolTipOpen}
      onMouseLeave={handleToolTipClose}
      data-status="closed"
      className="fixed bottom-4 z-40 m-4 hidden h-fit w-[64px] flex-shrink-0 rounded-lg bg-white p-2 shadow-md transition-all duration-300 ease-in-out sm:block lg:top-[calc(50%-80px)] lg:-translate-y-1/2 dark:bg-var-darkgray"
    >
      <YStack as="nav">
        <ZStack>
          <SidebarWriteButtonWithLogo
            me={me}
            closeToolTip={handleToolTipClose}
            isSelected={pathname === '/write'}
          />
          <ToolTip position="right" size="sm" isHover={isHover} text="글쓰기" />
        </ZStack>
        <Line />
        <YStack className="size-full">
          {TOP_NAVIGATE_MENUS.map((menu) => (
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
              me={me}
              pathname={pathname.split('/')[1]}
              userId={pathname.split('/')[2]}
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
    </Container>
  )
}

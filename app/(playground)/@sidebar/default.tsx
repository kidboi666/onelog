'use client'

import { useEffect, useState } from 'react'
import cn from '@/lib/cn'
import Line from '@/components/shared/Line'
import { List } from '@/components/shared/List'
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
import SidebarLogo from './_components/SidebarLogo'

export default function Sidebar() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [isHover, setHover] = useState(false)
  const pathname = usePathname()

  const handleToolTipOpen = () => {
    setHover(true)
  }

  const handleToolTipClose = () => {
    setHover(false)
  }

  useEffect(() => {
    setHover(false)
  }, [])

  return (
    <div
      onMouseEnter={handleToolTipOpen}
      onMouseLeave={handleToolTipClose}
      data-status="closed"
      className={cn(
        'fixed top-0 z-40 m-4 flex h-[calc(100dvh-32px)] w-[64px] flex-shrink-0 flex-col gap-2 rounded-lg bg-white p-2 shadow-md transition-all duration-300 ease-in-out dark:bg-var-darkgray',
      )}
    >
      <SidebarLogo />
      <Line />
      <List className="flex h-full w-full flex-col gap-2">
        {TOP_NAVIGATE_MENUS.map((menu) => (
          <List.Row key={menu.id} className="relative">
            <MenuButton
              isSelected={pathname === menu.path}
              icon={menu.icon}
              name={menu.name}
              path={menu.path}
            />
            <ToolTip position="right" isHover={isHover} text={menu.toolTip} />
          </List.Row>
        ))}
      </List>
      <List className="flex flex-col gap-2">
        {BOTTOM_NAVIGATE_MENUS.map((menu) => (
          <List.Row key={menu.id} className="relative">
            <MenuButton
              isSelected={pathname === menu.path}
              icon={menu.icon}
              name={menu.name}
              path={menu.path}
            />
            <ToolTip position="right" isHover={isHover} text={menu.toolTip} />
          </List.Row>
        ))}
        <div className="relative">
          <ThemeToggleButton />
          <ToolTip position="right" isHover={isHover} text="테마 버튼" />
        </div>
        <Line className="mb-2" />
        <div className="relative">
          <AuthButtonWithDropDown
            me={me}
            pathname={pathname.split('/')[1]}
            userId={pathname.split('/')[2]}
          />
          <ToolTip
            position="right"
            isHover={isHover}
            text={me ? me.email : '게스트'}
          />
        </div>
      </List>
    </div>
  )
}

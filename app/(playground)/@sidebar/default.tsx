'use client'

import { useEffect, useState } from 'react'
import cn from '@/lib/cn'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import Line from '@/components/shared/Line'
import { List } from '@/components/shared/List'
import MenuButton from './_components/MenuButton'
import {
  BOTTOM_NAVIGATE_MENUS,
  TOP_NAVIGATE_MENUS,
} from './_constants/Navigate'
import OpenButton from './_components/OpenButton'
import { usePathname } from 'next/navigation'
import ThemeToggleButton from '../@header/_components/ThemeToggleButton'
import AuthButtonWithDropDown from './_components/AuthButtonWithDropDown'
import ToolTip from '@/components/shared/Tooltip'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'

export default function Sidebar() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [isOpen, setOpen] = useState(false)
  const { ref, close, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>('w-14')
  const [isHover, setHover] = useState(false)
  const pathname = usePathname()

  const handlePanelState = () => {
    setOpen((prev) => !prev)
    onClick()
  }

  const handlePanelClose = () => {
    setOpen(false)
    close()
  }

  const handleToolTipOpen = () => {
    if (!isOpen) {
      setHover(true)
    }
  }

  const handleToolTipClose = () => {
    if (!isOpen) {
      setHover(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      setHover(false)
    }
  }, [isOpen])

  return (
    <div
      ref={ref}
      onMouseEnter={handleToolTipOpen}
      onMouseLeave={handleToolTipClose}
      onTransitionEnd={onTransitionEnd}
      data-status="closed"
      className={cn(
        'fixed top-0 z-40 m-4 flex h-[calc(100dvh-32px)] w-72 flex-shrink-0 flex-col gap-2 rounded-lg bg-white p-2 shadow-md transition-all duration-300 ease-in-out data-[status=closed]:w-[60px] dark:bg-var-darkgray',
      )}
    >
      {isOpen && (
        <div
          className="fixed inset-0 -z-10 bg-transparent"
          onClick={handlePanelClose}
        />
      )}
      <OpenButton isOpen={isOpen} onClick={handlePanelState} />
      <Line />
      <List className="flex h-full w-full flex-col gap-2">
        {TOP_NAVIGATE_MENUS.map((menu) => (
          <List.Row key={menu.id} className="relative">
            <MenuButton
              isSelected={pathname === menu.path}
              isOpen={isOpen}
              close={handlePanelClose}
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
              isOpen={isOpen}
              close={handlePanelClose}
              icon={menu.icon}
              name={menu.name}
              path={menu.path}
            />
            <ToolTip position="right" isHover={isHover} text={menu.toolTip} />
          </List.Row>
        ))}
        <div className="relative">
          <ThemeToggleButton isOpen={isOpen} />
          <ToolTip position="right" isHover={isHover} text="테마 버튼" />
        </div>
        <Line className="mb-2" />
        <div className="relative">
          <AuthButtonWithDropDown
            isOpen={isOpen}
            me={me}
            closeSidebar={handlePanelClose}
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

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

export default function Sidebar() {
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
        'fixed top-0 z-40 m-4 flex h-[calc(100dvh-32px)] w-72 flex-shrink-0 flex-col gap-2 rounded-lg bg-white p-2 shadow-md transition-all duration-300 ease-in-out data-[status=closed]:w-14 dark:bg-var-darkgray',
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
          <div key={menu.id} className="relative">
            <MenuButton
              isSelected={pathname === menu.path}
              isOpen={isOpen}
              close={handlePanelClose}
              icon={menu.icon}
              name={menu.name}
              path={menu.path}
            />
            <ToolTip position="right" isHover={isHover} text={menu.toolTip} />
          </div>
        ))}
      </List>
      <List className="flex flex-col gap-2">
        {BOTTOM_NAVIGATE_MENUS.map((menu) => (
          <div key={menu.id} className="relative">
            <MenuButton
              isSelected={pathname === menu.path}
              isOpen={isOpen}
              close={handlePanelClose}
              icon={menu.icon}
              name={menu.name}
              path={menu.path}
            />
            <ToolTip position="right" isHover={isHover} text={menu.toolTip} />
          </div>
        ))}
        <div className="relative">
          <ThemeToggleButton isOpen={isOpen} />
          <ToolTip position="right" isHover={isHover} text="테마 버튼" />
        </div>
        <Line className="mb-2" />
        <AuthButtonWithDropDown
          isOpen={isOpen}
          closeSidebar={handlePanelClose}
          pathname={pathname.split('/')[1]}
          userId={pathname.split('/')[2]}
        />
      </List>
    </div>
  )
}

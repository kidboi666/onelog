'use client'

import { useState } from 'react'
import cn from '@/lib/cn'
import useStateChange from '@/hooks/useStateChange'
import Line from '@/components/shared/Line'
import { List } from '@/components/shared/List'
import MenuButton from './_components/MenuButton'
import {
  BOTTOM_NAVIGATE_MENUS,
  TOP_NAVIGATE_MENUS,
} from './_constants/Navigate'
import AuthButton from './_components/AuthButton'
import OpenButton from './_components/OpenButton'
import { usePathname } from 'next/navigation'
import ThemeToggleButton from '../@header/_components/ThemeToggleButton'

export default function Sidebar() {
  const [isOpen, setOpen] = useState(false)
  const { ref, close, onClick, onTransitionEnd } =
    useStateChange<HTMLDivElement>('w-14')
  const pathname = usePathname()

  const handlePanelState = () => {
    setOpen((prev) => !prev)
    onClick()
  }

  const handlePanelClose = () => {
    setOpen(false)
    close()
  }

  return (
    <div
      ref={ref}
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
          <MenuButton
            key={menu.id}
            isSelected={pathname === menu.path}
            isOpen={isOpen}
            icon={menu.icon}
            name={menu.name}
            path={menu.path}
          />
        ))}
      </List>
      <List className="flex flex-col gap-2">
        {BOTTOM_NAVIGATE_MENUS.map((menu) => (
          <MenuButton
            key={menu.id}
            isSelected={pathname === menu.path}
            isOpen={isOpen}
            icon={menu.icon}
            name={menu.name}
            path={menu.path}
          />
        ))}
        <ThemeToggleButton isOpen={isOpen} />

        <Line className="mb-2" />
        <AuthButton isOpen={isOpen} pathname={pathname.split('/')[2]} />
      </List>
    </div>
  )
}

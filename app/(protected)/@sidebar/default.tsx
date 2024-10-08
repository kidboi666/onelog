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

export default function Default() {
  const [isOpen, setOpen] = useState(false)
  const { ref, close, onClick } = useStateChange<HTMLDivElement>()

  const handleTransitionEnd = () => {
    if (ref?.current?.getAttribute('data-status') === 'closed') {
      ref.current.classList.add('w-72')
    }
  }

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
      onTransitionEnd={handleTransitionEnd}
      data-status="closed"
      className={cn(
        'fixed top-[48px] z-30 flex h-[calc(100dvh-48px)] w-72 flex-shrink-0 flex-col gap-2 bg-white p-4 shadow-md transition-all duration-300 ease-in-out data-[status=closed]:w-[74px] dark:bg-var-darkgray',
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
            isOpen={isOpen}
            icon={menu.icon}
            name={menu.name}
            path={menu.path}
          />
        ))}
        <Line className="mb-2" />
        <AuthButton isOpen={isOpen} />
      </List>
    </div>
  )
}

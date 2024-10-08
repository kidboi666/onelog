'use client'

import Button from '@/components/shared/Button'

import { useTheme } from '@/store/useTheme'
import { TTheme } from '@/types/theme'
import Icon from '@/components/shared/Icon'
import cn from '@/lib/cn'

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()

  const changeDocumentClass = (theme: TTheme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleThemeChange = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    changeDocumentClass(nextTheme)
  }

  return (
    <nav className="relative flex gap-2">
      <Button
        variant="list"
        onClick={handleThemeChange}
        className="flex w-full items-center justify-between gap-2 py-2"
      >
        <div className="flex gap-2">
          <Icon view="0 -960 960 960" size={18}>
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
          </Icon>
        </div>
        <div
          className={cn(
            'h-fit w-8 rounded-full p-[1px] transition',
            theme === 'dark' ? 'bg-green-500' : 'bg-zinc-400',
          )}
        >
          <div
            className={cn(
              'size-4 rounded-full bg-zinc-200 transition',
              theme === 'dark' ? 'translate-x-[14px]' : '',
            )}
          />
        </div>
      </Button>
    </nav>
  )
}

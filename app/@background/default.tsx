'use client'

import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'
import { TColor } from '@/types/theme'
import { useLayoutEffect } from 'react'

export default function Background() {
  const { setColor, theme, setTheme } = useTheme()

  useLayoutEffect(() => {
    const currentColor = localStorage.getItem('color-theme') as TColor
    const isDarkMode = localStorage.getItem('theme') === 'dark'

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }
    setColor(currentColor ?? 'black')

    document.body.classList.remove('hidden')
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-0 -z-10 h-dvh w-dvw',
        theme === 'light' ? 'bg-white' : 'bg-var-dark',
      )}
    />
  )
}

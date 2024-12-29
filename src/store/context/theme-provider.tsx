'use client'

import { useTheme } from '@/src/store/useTheme'
import { PropsWithChildren, useLayoutEffect } from 'react'
import { TColor } from '@/src/types/theme'

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { setColor, setTheme } = useTheme()

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

  return <>{children}</>
}

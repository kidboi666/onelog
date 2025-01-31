'use client'

import { PropsWithChildren, useLayoutEffect } from 'react'
import { useTheme } from '@/src/store/hooks/useTheme'
import { ColorScheme, Theme } from '@/src/types/enums'

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { setColor, setTheme } = useTheme()

  useLayoutEffect(() => {
    const currentColor = localStorage.getItem('color-theme') as ColorScheme
    const isDarkMode = localStorage.getItem('theme') === Theme.DARK

    if (isDarkMode) {
      document.documentElement.classList.add(Theme.DARK)
      setTheme(Theme.DARK)
    } else {
      document.documentElement.classList.remove(Theme.DARK)
      setTheme(Theme.LIGHT)
    }
    setColor(currentColor ?? ColorScheme.BLACK)

    document.body.classList.remove('hidden')
  }, [])

  return <>{children}</>
}

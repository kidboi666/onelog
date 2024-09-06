'use client'

import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'
import { useEffect } from 'react'

export default function Background() {
  const { color, setColor, theme, setTheme } = useTheme()

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    const currentColor = localStorage.getItem('color-theme')
    switch (currentColor) {
      case 'green':
        setColor('green')
        break
      case 'blue':
        setColor('blue')
        break
      case 'yellow':
        setColor('yellow')
        break
      case 'orange':
        setColor('orange')
        break
      case 'black':
        setColor('black')
        break
      default:
        break
    }
  }, [])
  return (
    <div
      className={cn(
        'fixed -z-10 h-dvh w-dvw',
        theme === 'light' ? 'bg-white' : 'bg-var-dark',
      )}
    />
  )
}

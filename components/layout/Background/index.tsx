'use client'

import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'

export default function Background() {
  const { theme } = useTheme()

  return (
    <div
      className={cn(
        'fixed -z-10 h-dvh w-dvw',
        theme === 'light' ? 'bg-white' : 'bg-var-dark',
      )}
    />
  )
}

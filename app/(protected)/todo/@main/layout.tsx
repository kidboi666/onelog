'use client'

import { PropsWithChildren } from 'react'
import cn from '@/lib/cn'
import { useSearchParams } from 'next/navigation'

export default function Layout({ children }: PropsWithChildren) {
  const color = useSearchParams().get('color')
  return (
    <div
      className={cn(
        'relative flex h-[calc(100dvh-80px)] w-full flex-col gap-4 p-4',
        color === 'yellow' && 'bg-var-yellow/15 dark:bg-var-yellow/25',
        color === 'orange' && 'bg-var-orange/15 dark:bg-var-orange/25',
        color === 'black' && 'bg-black/15 dark:bg-black/25',
        color === 'blue' && 'bg-var-blue/15 dark:bg-var-blue/25',
        color === 'green' && 'bg-var-green/15 dark:bg-var-green/25',
        color === 'red' && 'bg-red-500/15 dark:bg-red-500/25',
        color === 'purple' && 'bg-purple-500/15 dark:bg-purple-500/25',
      )}
    >
      {children}
    </div>
  )
}

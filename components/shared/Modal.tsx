'use client'

import cn from '@/lib/cn'
import { useRouter } from 'next/navigation'
import { ComponentProps, PropsWithChildren, useEffect } from 'react'

interface Props extends ComponentProps<'div'> {
  className?: string
  as?: 'div'
}

export default function Modal({
  as: Component = 'div',
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const router = useRouter()

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.back()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 z-50 animate-fade-in bg-var-dark/25 backdrop-blur-sm dark:bg-var-dark/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed left-1/2 top-1/2 flex h-fit w-full max-w-[calc(100%-12px)] -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg md:max-w-[480px]"
        {...props}
      >
        <div
          className={cn(
            'flex w-full flex-col items-center justify-center gap-12 rounded-md bg-white px-2 py-8 md:px-8 dark:bg-var-darkgray',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

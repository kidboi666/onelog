'use client'

import cn from '@/lib/cn'
import { useModal } from '@/store/useModal'
import { ComponentProps, PropsWithChildren, useEffect } from 'react'

interface Props extends ComponentProps<'div'> {
  className?: string
  as?: 'div' | 'form'
}

export default function ModalContainer({
  as: Component = 'div',
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const { data, closeModal } = useModal()

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      return closeModal()
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
      className="fixed left-1/2 top-1/2 flex h-fit w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white"
      {...props}
    >
      <Component
        className={cn(
          'flex w-full flex-col items-center justify-center gap-12 p-8',
          className,
        )}
      >
        {children}
      </Component>
    </div>
  )
}

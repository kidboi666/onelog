'use client'

import useStateChange from '@/hooks/useStateChange'
import cn from '@/lib/cn'
import { useRouter } from 'next/navigation'
import { ComponentProps, PropsWithChildren, useEffect, useRef } from 'react'

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
  const isMouseDown = useRef<boolean>(false)
  const {
    close: insideClose,
    open: insideOpen,
    ref: insideRef,
    onTransitionEnd: insideOnTransitionEnd,
  } = useStateChange<HTMLDivElement>()
  const {
    close: outsideClose,
    open: outsideOpen,
    ref: outsideRef,
    onTransitionEnd: outsideOnTransitionEnd,
  } = useStateChange<HTMLDivElement>()

  const handleMouseDown = () => {
    isMouseDown.current = true
  }

  const handleMouseUp = () => {
    if (isMouseDown.current) {
      insideClose()
      outsideClose()
      setTimeout(() => {
        router.back()
      }, 100)
    }
    isMouseDown.current = false
  }

  useEffect(() => {
    setTimeout(() => {
      insideOpen()
      outsideOpen()
    }, 0)
  }, [])

  return (
    <>
      <div
        ref={outsideRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        data-status="closed"
        onTransitionEnd={outsideOnTransitionEnd}
        className="fixed inset-0 z-40 bg-var-dark/25 backdrop-blur-sm transition ease-in-out data-[status=closed]:opacity-0 dark:bg-var-dark/25"
      />
      <div
        ref={insideRef}
        data-status="closed"
        onTransitionEnd={insideOnTransitionEnd}
        className="fixed left-1/2 top-1/2 z-50 flex h-fit w-full max-w-[calc(100%-12px)] origin-top -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg transition ease-in-out data-[status=closed]:scale-90 data-[status=closed]:opacity-0 md:max-w-[480px]"
        {...props}
      >
        <div
          className={cn(
            'flex w-full flex-col items-center justify-center gap-12 rounded-md bg-var-lightgray px-4 py-8 md:px-8 dark:bg-var-darkgray',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}

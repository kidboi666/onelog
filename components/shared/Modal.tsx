'use client'

import useStateChange from '@/hooks/useStateChange'
import cn from '@/lib/cn'
import { useRouter } from 'next/navigation'
import { ComponentProps, PropsWithChildren, useEffect, useRef } from 'react'
import Button from './Button'
import Icon from './Icon'

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

  const handleCloseModal = () => {
    router.back()
  }

  return (
    <>
      <div
        ref={outsideRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        data-status="closed"
        onTransitionEnd={outsideOnTransitionEnd}
        className="fixed inset-0 z-40 overflow-hidden bg-var-dark/25 backdrop-blur-sm transition ease-in-out data-[status=closed]:opacity-0 dark:bg-var-dark/25"
      />
      <div
        ref={insideRef}
        data-status="closed"
        onTransitionEnd={insideOnTransitionEnd}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 flex h-fit max-h-[calc(100%-40px)] w-full max-w-[calc(100%-20px)] origin-top -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-12 rounded-md bg-var-lightgray p-4 shadow-lg transition ease-in-out data-[status=closed]:scale-90 data-[status=closed]:opacity-0 md:max-w-[600px] dark:bg-var-darkgray',
          className,
        )}
        {...props}
      >
        <Button
          variant="icon"
          onClick={handleCloseModal}
          className="absolute right-0 top-0 rounded-full"
        >
          <Icon view="0 -960 960 960" size={18}>
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </Icon>
        </Button>
        {children}
      </div>
    </>
  )
}

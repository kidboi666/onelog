import cn from '@/lib/cn'
import { ComponentProps, RefObject } from 'react'

type As = 'div' | 'main' | 'nav' | 'footer' | 'header'

interface Props extends ComponentProps<'div'> {
  as?: As
  className?: string
  dataStatus?: string
  targetRef?: RefObject<HTMLDivElement>
}

export default function Container({
  as: Component = 'div',
  dataStatus,
  onClick,
  children,
  className,
  targetRef,
}: Props) {
  return (
    <Component
      ref={targetRef}
      data-status={dataStatus}
      onClick={onClick}
      className={cn('dark:bg-var-dark bg-white', className)}
    >
      {children}
    </Component>
  )
}

import cn from '@/lib/cn'
import { ComponentProps, PropsWithChildren } from 'react'

interface Props extends ComponentProps<'div'> {
  as?: 'div'
  className?: string
  isRounded?: boolean
  isBackground?: boolean
}

export default function Box({
  as: Component = 'div',
  children,
  className,
  isRounded,
  isBackground,
  onClick,
  ...Props
}: PropsWithChildren<Props>) {
  return (
    <Component
      onClick={onClick}
      className={cn(
        isRounded && 'rounded-md ring-1 ring-var-gray',
        isBackground && 'bg-white dark:bg-var-dark',
        className,
      )}
      {...Props}
    >
      {children}
    </Component>
  )
}

import cn from '@/lib/cn'
import { ComponentProps, PropsWithChildren } from 'react'

interface Props extends ComponentProps<'div'> {
  as?: 'div'
  className?: string
  isRounded?: boolean
  isBackground?: boolean
  col?: boolean
  row?: boolean
}

export default function Box({
  as: Component = 'div',
  children,
  className,
  isRounded,
  isBackground,
  col,
  row,
  onClick,
  ...Props
}: PropsWithChildren<Props>) {
  return (
    <Component
      onClick={onClick}
      className={cn(
        isRounded && 'rounded-md',
        isBackground && 'bg-white dark:bg-var-black',
        col && 'flex flex-col',
        row && 'flex',
        className,
      )}
      {...Props}
    >
      {children}
    </Component>
  )
}

import cn from '@/lib/cn'
import { ComponentProps, PropsWithChildren } from 'react'

interface Props extends ComponentProps<'div'> {
  as?: 'div'
  className?: string
}

export default function Box({
  as: Component = 'div',
  children,
  className,
  onClick,
  ...Props
}: PropsWithChildren<Props>) {
  return (
    <Component onClick={onClick} className={cn(className)} {...Props}>
      {children}
    </Component>
  )
}

import cn from '@/lib/cn'
import { ComponentProps, PropsWithChildren, RefObject } from 'react'

interface Props extends ComponentProps<'ul'> {
  className?: string
  targetRef?: RefObject<HTMLUListElement>
}

export const List = ({
  children,
  className,
  targetRef,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <ul ref={targetRef} className={cn('list-none', className)} {...props}>
      {children}
    </ul>
  )
}

interface RowProps extends ComponentProps<'li'> {
  className?: string
  targetRef?: RefObject<HTMLLIElement>
}

List.Row = ({
  children,
  className,
  targetRef,
  ...props
}: PropsWithChildren<RowProps>) => {
  return (
    <li ref={targetRef} className={cn(className)} {...props}>
      {children}
    </li>
  )
}

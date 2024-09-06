import cn from '@/lib/cn'
import { ComponentProps, PropsWithChildren, RefObject } from 'react'

interface Props extends ComponentProps<'ul'> {
  className?: string
  targetRef?: RefObject<HTMLUListElement>
  isRounded?: boolean
  isBackground?: boolean
  dataStatus?: string
}

export const List = ({
  children,
  className,
  targetRef,
  dataStatus,
  isRounded,
  isBackground,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <ul
      ref={targetRef}
      data-status={dataStatus}
      onTransitionEnd={() => {
        if (targetRef?.current?.getAttribute('data-status') === 'closed') {
          targetRef.current.classList.add('hidden')
        }
      }}
      className={cn(
        'list-none',
        isRounded && 'rounded-md border border-gray-200 dark:border-gray-600',
        isBackground && 'bg-white dark:bg-var-dark',
        className,
      )}
      {...props}
    >
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

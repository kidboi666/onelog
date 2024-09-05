import cn from '@/lib/cn'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'

interface Props extends ComponentProps<'div'> {
  as?: 'div'
  className?: string
  dataStatus?: string
}

const Box = forwardRef<HTMLDivElement, PropsWithRef<Props>>(
  (
    { as: Component = 'div', dataStatus, children, className, onClick },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        data-status={dataStatus}
        onClick={onClick}
        className={cn('dark:bg-var-dark bg-white', className)}
      >
        {children}
      </Component>
    )
  },
)

export default Box

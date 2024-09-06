import cn from '@/lib/cn'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'

interface Props extends ComponentProps<'div'> {
  as?: 'div'
  className?: string
  dataStatus?: string
}

const RefBox = forwardRef<HTMLDivElement, PropsWithRef<Props>>(
  (
    {
      as: Component = 'div',
      dataStatus,
      children,
      className,
      onClick,
      ...Props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        data-status={dataStatus}
        onClick={onClick}
        className={cn(className)}
        {...Props}
      >
        {children}
      </Component>
    )
  },
)

export default RefBox

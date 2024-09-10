import cn from '@/lib/cn'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'

interface Props extends ComponentProps<'div'> {
  as?: 'div'
  className?: string
  dataStatus?: string
  isRounded?: boolean
  isBackground?: boolean
  onTransitionEnd?: () => void
}

const RefBox = forwardRef<HTMLDivElement, PropsWithRef<Props>>(
  (
    {
      as: Component = 'div',
      dataStatus,
      children,
      className,
      onClick,
      isRounded,
      isBackground,
      onTransitionEnd,
      ...Props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        data-status={dataStatus}
        onClick={onClick}
        onTransitionEnd={onTransitionEnd}
        className={cn(
          isRounded && 'rounded-md',
          isBackground && 'dark:bg-var-darkgray bg-white',
          className,
        )}
        {...Props}
      >
        {children}
      </Component>
    )
  },
)

export default RefBox

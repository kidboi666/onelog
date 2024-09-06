import cn from '@/lib/cn'
import {
  ComponentProps,
  forwardRef,
  PropsWithRef,
  TransitionEvent,
} from 'react'

type As = 'div' | 'main' | 'nav' | 'footer' | 'header'

interface Props extends ComponentProps<'div'> {
  as?: As
  className?: string
  dataStatus?: string
  isRounded?: boolean
  isBackground?: boolean
  isBlur?: boolean
}

const RefContainer = forwardRef<HTMLDivElement, PropsWithRef<Props>>(
  (
    {
      as: Component = 'div',
      dataStatus,
      isRounded,
      isBackground,
      isBlur,
      onClick,
      children,
      className,
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
          isRounded && 'rounded-md ring-1 ring-gray-300 dark:ring-gray-600',
          isBlur && 'bg-white/70 backdrop-blur-lg dark:bg-var-dark/70',
          isBackground && 'bg-white dark:bg-var-dark',
          className,
        )}
        {...Props}
      >
        {children}
      </Component>
    )
  },
)

export default RefContainer

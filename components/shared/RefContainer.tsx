import cn from '@/lib/cn'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'

type As = 'div' | 'main' | 'nav' | 'footer' | 'header'

interface Props extends ComponentProps<'div'> {
  as?: As
  className?: string
  dataStatus?: string
  isRounded?: boolean
  isBackground?: boolean
  isBlur?: boolean
  isPage?: boolean
}

const RefContainer = forwardRef<HTMLDivElement, PropsWithRef<Props>>(
  (
    {
      as: Component = 'div',
      dataStatus,
      isRounded,
      isBackground,
      isBlur,
      isPage,
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
          isRounded && 'rounded-md',
          isBlur && 'dark:bg-var-darkgray/70 bg-white/70 backdrop-blur-lg',
          isBackground && 'dark:bg-var-darkgray bg-white',
          isPage && 'mt-4',
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

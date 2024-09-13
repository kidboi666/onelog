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
  isEmpty?: boolean
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
      isEmpty,
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
          isBackground && 'bg-white dark:bg-var-darkgray',
          isBlur && 'bg-white/60 backdrop-blur-xl dark:bg-var-darkgray/60',
          isPage && 'mt-20',
          isEmpty && 'flex w-full items-center justify-center py-12 opacity-65',
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

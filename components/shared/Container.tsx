import cn from '@/lib/cn'
import { ComponentProps } from 'react'

type As = 'div' | 'main' | 'nav' | 'footer' | 'header'

interface Props extends ComponentProps<'div'> {
  as?: As
  className?: string
  dataStatus?: string
  isRounded?: boolean
  isBlur?: boolean
  isBackground?: boolean
  isPage?: boolean
  isEmpty?: boolean
}

export default function Container({
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
}: Props) {
  return (
    <Component
      data-status={dataStatus}
      onClick={onClick}
      className={cn(
        isRounded && 'rounded-md',
        isBackground && 'bg-white dark:bg-var-black',
        isBlur && 'bg-white/60 backdrop-blur-xl dark:bg-var-black/60',
        isPage && 'mt-20',
        isEmpty && 'flex w-full items-center justify-center py-12 opacity-65',
        className,
      )}
    >
      {children}
    </Component>
  )
}

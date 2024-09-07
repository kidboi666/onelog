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
}

export default function Container({
  as: Component = 'div',
  dataStatus,
  isRounded,
  isBackground,
  isBlur,
  isPage,
  onClick,
  children,
  className,
}: Props) {
  return (
    <Component
      data-status={dataStatus}
      onClick={onClick}
      className={cn(
        isRounded && 'rounded-md ring-1 ring-gray-300 dark:ring-gray-600',
        isBackground && 'dark:bg-var-white bg-white',
        isBlur && 'bg-white/70 backdrop-blur-lg dark:bg-var-dark/70',
        isPage && 'mt-4',
        className,
      )}
    >
      {children}
    </Component>
  )
}

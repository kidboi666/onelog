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
        isRounded && 'rounded-md ring-1 ring-var-gray ',
        isBackground && 'dark:bg-var-black bg-white',
        isBlur && 'bg-white/60 backdrop-blur-lg dark:bg-var-dark/60',
        isPage && 'mt-4',
        className,
      )}
    >
      {children}
    </Component>
  )
}

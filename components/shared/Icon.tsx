import cn from '@/lib/cn'
import { PropsWithChildren } from 'react'

interface Props {
  size?: number
  name?: string
  className?: string
  view?: number
}

export default function Icon({
  children,
  name,
  className,
  size = 24,
  view = 24,
}: PropsWithChildren<Props>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${view} ${view}`}
      className={cn(className)}
      aria-valuetext={name}
      aria-hidden
      fill="currentColor"
    >
      {children}
    </svg>
  )
}

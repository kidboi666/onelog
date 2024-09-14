import cn from '@/lib/cn'
import { PropsWithChildren } from 'react'

interface Props {
  name?: string
  className?: string
  size?: number
  sizeX?: number
  sizeY?: number
  view?: number
  viewX?: number
  viewY?: number
}

export default function Icon({
  children,
  name,
  className,
  size = 24,
  sizeX,
  sizeY,
  view = 24,
  viewX,
  viewY,
}: PropsWithChildren<Props>) {
  return (
    <svg
      width={sizeX || size}
      height={sizeY || size}
      viewBox={`0 0 ${viewX || view} ${viewY || view}`}
      className={cn(className)}
      aria-valuetext={name}
      stroke="currentColor"
      fill="currentColor"
    >
      {children}
    </svg>
  )
}

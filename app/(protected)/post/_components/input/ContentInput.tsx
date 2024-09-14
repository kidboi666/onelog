import cn from '@/lib/cn'
import { PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export default function ContentInput({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <p className={cn('h-full text-gray-600 outline-none', className)}>
      {children}
    </p>
  )
}

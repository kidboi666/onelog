import cn from '@/lib/cn'
import { PropsWithChildren } from 'react'

interface Props {
  isBackground?: boolean
  className?: string
}

export default function Container({
  children,
  isBackground,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-12 rounded-md max-lg:px-4 lg:w-[768px]',
        isBackground ? 'bg-white shadow-md dark:bg-var-darkgray' : '',
        className,
      )}
    >
      {children}
    </div>
  )
}

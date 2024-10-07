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
        'flex w-full flex-col gap-12 rounded-md max-md:px-4 md:w-[768px]',
        isBackground ? 'bg-white shadow-md dark:bg-var-darkgray' : '',
        className,
      )}
    >
      {children}
    </div>
  )
}

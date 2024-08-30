import cn from '@/lib/cn'
import { PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export default function ModalContainer({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className="fixed left-1/2 top-1/2 flex h-fit w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white">
      <div
        className={cn(
          'flex w-full flex-col items-center justify-center gap-12 p-8',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

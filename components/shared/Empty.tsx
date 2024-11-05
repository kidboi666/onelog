import { PropsWithChildren } from 'react'
import cn from '@/lib/cn'
import Text from './Text'

interface Props {
  className?: string
}

const Empty = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-md bg-white py-12 opacity-65 shadow-sm dark:bg-var-darkgray',
        className,
      )}
    >
      {children}
    </div>
  )
}

const EmptyText = ({ children }: PropsWithChildren) => {
  return <Text type="caption">{children}</Text>
}

Empty.Text = EmptyText

export default Empty

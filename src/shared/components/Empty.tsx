import { PropsWithChildren } from 'react'
import cn from '@/src/lib/cn'
import TextDisplay from '@/src/components/TextDisplay'
import Button from './Button'
import Icon, { IconProps } from './Icon'

interface Props {
  className?: string
  isShadow?: boolean
}

const Empty = ({
  children,
  isShadow = false,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-md bg-white py-12 opacity-65 dark:bg-var-darkgray',
        isShadow && 'shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

const EmptyText = ({ children }: PropsWithChildren) => {
  return <TextDisplay type="caption">{children}</TextDisplay>
}

const EmptyIcon = ({ children, ...props }: PropsWithChildren<IconProps>) => {
  return (
    <Button disabled variant="icon" size="icon">
      <Icon {...props}>{children}</Icon>
    </Button>
  )
}

Empty.Text = EmptyText
Empty.Icon = EmptyIcon

export default Empty

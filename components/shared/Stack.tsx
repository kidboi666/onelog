import cn from '@/lib/cn'
import { ComponentProps, PropsWithChildren } from 'react'

type GapSizes =
  | 'px'
  | 1
  | 2
  | 3
  | 4
  | 6
  | 8
  | 10
  | 12
  | 14
  | 16
  | 18
  | 20
  | 22
  | 24

interface StackProps extends ComponentProps<'div'> {
  className?: string
  gap?: GapSizes
  as?: 'div' | 'nav' | 'header' | 'main' | 'footer' | 'article' | 'section'
  direction?: 'row' | 'col'
}

const Stack = ({
  children,
  gap = 2,
  className,
  as: Component = 'div',
  direction = 'row',
}: PropsWithChildren<StackProps>) => {
  return (
    <Component
      className={cn(
        direction === 'col' ? 'flex flex-col' : 'flex',
        `gap-${gap}`,
        className,
      )}
    >
      {children}
    </Component>
  )
}

export const XStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} />
)
export const YStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} direction="col" />
)
export const ZStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} className="relative" />
)

XStack.displayName = 'XStack'
YStack.displayName = 'YStack'
ZStack.displayName = 'ZStack'

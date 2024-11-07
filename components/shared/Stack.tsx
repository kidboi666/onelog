import cn from '@/lib/cn'
import { ComponentProps, PropsWithChildren } from 'react'

type GapSizes = 'px' | 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12

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
  const gapSizes = `gap-${gap}`
  return (
    <Component
      className={cn(
        direction === 'col' ? 'flex flex-col' : 'flex',
        gapSizes,
        className,
      )}
    >
      {children}
    </Component>
  )
}

export const XStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} direction="row" />
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

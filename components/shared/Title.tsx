import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ElementType, PropsWithChildren } from 'react'

interface Props {
  as?: ElementType
  className?: string
  type?: 'title' | 'sub' | 'customColor'
  size?: 'sm' | 'md' | 'lg' | 'bigger' | 'xs'
}

const TITLE_VARIANTS = cva('', {
  variants: {
    type: {
      title: 'font-semibold text-gray-600 dark:text-gray-400',
      sub: 'font-medium text-gray-600 dark:text-gray-400',
      customColor: 'font-semibold',
    },
    size: {
      xs: 'text-base',
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-4xl',
      bigger: 'text-4xl md:text-6xl',
    },
  },
})

export default function Title({
  children,
  className,
  type = 'title',
  size = 'md',
  as: Component = 'h1',
}: PropsWithChildren<Props>) {
  return (
    <Component className={cn(TITLE_VARIANTS({ type, size }), className)}>
      {children}
    </Component>
  )
}

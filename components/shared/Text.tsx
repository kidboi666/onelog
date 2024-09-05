import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ElementType, PropsWithChildren } from 'react'

interface Props {
  as?: ElementType
  className?: string
  type?: 'body' | 'caption' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const TEXT_VARIANTS = cva('', {
  variants: {
    type: {
      body: 'text-gray-700 dark:text-gray-100',
      caption: 'text-gray-400 dark:text-gray-400',
      error: 'text-red-500',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
})

export default function Text({
  children,
  className,
  type = 'body',
  size = 'md',
  as: Component = 'p',
}: PropsWithChildren<Props>) {
  return (
    <Component className={cn(TEXT_VARIANTS({ type, size }), className)}>
      {children}
    </Component>
  )
}

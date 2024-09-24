import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ElementType, PropsWithChildren } from 'react'

interface Props {
  as?: ElementType
  className?: string
  type?: 'body' | 'caption' | 'error' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const TEXT_VARIANTS = cva('', {
  variants: {
    type: {
      body: 'text-zinc-600 dark:text-zinc-200',
      caption: 'text-zinc-400 dark:text-zinc-500',
      error: 'text-red-500',
      none: '',
    },
    size: {
      xs: 'text-[10px]',
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

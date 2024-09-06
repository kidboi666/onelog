'use client'

import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'textarea'> {
  className?: string
  variant?: 'primary' | 'secondary'
  dimension?: 'sm' | 'md' | 'lg'
}

const TEXTAREA_VARIANTS = cva('w-full outline-none transition', {
  variants: {
    variant: {
      primary:
        'h-fit min-h-20 rounded-md ring-1 ring-gray-800 focus:ring-4 dark:bg-var-dark dark:text-white dark:ring-white',
      secondary: 'border-b-1 border-gray-400 focus:border-b-4',
    },
    dimension: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
})

export default function TextArea({
  className,
  variant = 'primary',
  dimension = 'md',
  ...props
}: Props) {
  return (
    <textarea
      className={cn(TEXTAREA_VARIANTS({ variant, dimension }), className)}
      {...props}
    />
  )
}

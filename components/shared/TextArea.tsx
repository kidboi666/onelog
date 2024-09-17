'use client'

import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'textarea'> {
  className?: string
  variant?: 'primary' | 'secondary' | 'none'
  dimension?: 'sm' | 'md' | 'lg' | 'none'
}

const TEXTAREA_VARIANTS = cva('w-full outline-none transition', {
  variants: {
    variant: {
      primary:
        'h-fit min-h-20 resize-none rounded-md shadow-sm ring-gray-200 focus:ring-4 dark:bg-var-darkgray dark:text-white dark:ring-white dark:focus:ring-gray-600',
      secondary: 'border-b-1 border-gray-400 focus:border-b-4',
      none: '',
    },
    dimension: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      none: '',
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

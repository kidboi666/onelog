'use client'

import { cva } from 'class-variance-authority'
import { ComponentProps, RefObject } from 'react'
import cn from '@/src/lib/cn'

interface Props extends ComponentProps<'textarea'> {
  className?: string
  targetRef?: RefObject<HTMLTextAreaElement>
  variant?: 'primary' | 'secondary' | 'none'
  dimension?: 'sm' | 'md' | 'lg' | 'none'
}

const TEXTAREA_VARIANTS = cva('w-full outline-none transition', {
  variants: {
    variant: {
      primary:
        'h-fit min-h-20 resize-none rounded-md shadow-sm ring-zinc-200 focus:ring-2 dark:bg-var-darkgray dark:text-white dark:ring-white dark:focus:ring-zinc-600',
      secondary: 'border-b-1 border-zinc-400 focus:border-b-4',
      none: '',
    },
    dimension: {
      sm: 'p-1 text-xs',
      md: 'p-1 text-sm',
      lg: 'text-base',
      none: '',
    },
  },
})

export default function TextArea({
  value,
  className,
  targetRef,
  variant = 'primary',
  dimension = 'md',
  ...props
}: Props) {
  return (
    <textarea
      value={value ?? ''}
      ref={targetRef}
      className={cn(TEXTAREA_VARIANTS({ variant, dimension }), className)}
      {...props}
    />
  )
}

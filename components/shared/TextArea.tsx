'use client'

import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, useRef } from 'react'

interface Props extends ComponentProps<'textarea'> {
  className?: string
  variant?: 'primary' | 'secondary'
  dimension?: 'sm' | 'md' | 'lg'
}

const TEXTAREA_VARIANTS = cva('w-full outline-none', {
  variants: {
    variant: {
      primary: 'h-fit min-h-12 border-b border-gray-800',
      secondary: 'border-b-1 border-gray-400 transition focus:border-b-4',
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

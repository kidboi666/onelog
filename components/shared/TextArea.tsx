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
      primary: 'h-fit min-h-20 border-b-2 border-blue-200',
      secondary: 'border-b-2 border-blue-200 transition focus:border-b-4',
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
  const lineRef = useRef<HTMLDivElement>(null)
  return (
    <div className="flex flex-col">
      <textarea
        onFocus={() => lineRef.current?.setAttribute('data-status', 'onFocus')}
        onBlur={() => lineRef.current?.setAttribute('data-status', 'onBlur')}
        className={cn(TEXTAREA_VARIANTS({ variant, dimension }), className)}
        {...props}
      />
      <div
        ref={lineRef}
        data-status="onBlur"
        className="h-1 origin-left bg-blue-200 transition ease-in-out data-[status=onBlur]:scale-x-0"
      />
    </div>
  )
}

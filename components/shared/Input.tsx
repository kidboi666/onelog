'use client'

import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, useRef } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface Props extends ComponentProps<'input'> {
  className?: string
  variant?: 'primary' | 'secondary' | 'auth'
  register?: UseFormRegisterReturn
  error?: FieldError
  dimension?: 'sm' | 'md' | 'lg'
}

const INPUT_VARIANTS = cva('outline-none', {
  variants: {
    variant: {
      primary:
        'bg-gray-100 shadow-md transition focus:bg-white focus:ring-2 focus:ring-blue-200',
      secondary: 'border-b border-blue-200 transition',
      auth: 'bg-gray-100 transition focus:ring-2 focus:ring-blue-200',
    },
    dimension: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
})

export default function Input({
  className,
  register,
  variant = 'primary',
  dimension,
  ...props
}: Props) {
  const lineRef = useRef<HTMLDivElement>(null)
  return (
    <div className="flex flex-col">
      <input
        onFocus={() => lineRef.current?.setAttribute('data-status', 'onFocus')}
        onBlur={() => lineRef.current?.setAttribute('data-status', 'onBlur')}
        className={cn(INPUT_VARIANTS({ variant, dimension }), className)}
        {...register}
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

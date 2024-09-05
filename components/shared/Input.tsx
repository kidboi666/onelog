import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'
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
        'border-b border-blue-200 bg-gray-100 shadow-md transition focus:bg-white',
      secondary:
        'dark:bg-var-gray border-b border-gray-800 bg-white transition dark:border-white dark:text-white',
      auth: 'rounded-md bg-gray-200 transition dark:bg-white/45 dark:text-white',
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
  return (
    <input
      className={cn(INPUT_VARIANTS({ variant, dimension }), className)}
      {...register}
      {...props}
    />
  )
}

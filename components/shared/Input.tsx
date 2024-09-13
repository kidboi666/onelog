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
        'rounded-md bg-white shadow-sm ring-gray-200 transition focus:ring-4 dark:bg-var-darkgray dark:text-white dark:ring-gray-600',
      secondary:
        'border-b border-gray-800 bg-transparent transition ease-in-out dark:border-white dark:bg-transparent dark:text-white',
      auth: 'rounded-md bg-gray-200 transition dark:bg-white/15 dark:text-white',
    },
    dimension: {
      sm: 'py-2 text-sm',
      md: 'p-4 text-sm',
      lg: 'p-4 text-base',
    },
  },
})

export default function Input({
  className,
  register,
  variant = 'primary',
  dimension = 'sm',
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

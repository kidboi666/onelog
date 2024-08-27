import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface Props extends ComponentProps<'input'> {
  className?: string
  variant?: 'primary' | 'secondary'
  register?: UseFormRegisterReturn
  error?: FieldError
}

const INPUT_VARIANTS = cva('', {
  variants: {
    variant: {
      primary: '',
      secondary: '',
    },
  },
})

export default function Input({
  className,
  register,
  variant = 'primary',
  ...props
}: Props) {
  return (
    <input
      className={cn(INPUT_VARIANTS({ variant }), className)}
      {...register}
      {...props}
    />
  )
}

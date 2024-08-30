import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'textarea'> {
  className?: string
  variant?: 'primary' | 'secondary'
  dimension?: 'sm' | 'md' | 'lg'
}

const TEXTAREA_VARIANTS = cva('w-full outline-none', {
  variants: {
    variant: {
      primary: 'h-6 max-h-40 border-b-2 border-blue-200',
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
  return (
    <textarea
      className={cn(TEXTAREA_VARIANTS({ variant, dimension }), className)}
      {...props}
    />
  )
}

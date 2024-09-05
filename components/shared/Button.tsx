'use client'

import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'
import Spinner, { Size } from './Spinner'
import { useTheme } from '@/store/useTheme'

export interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'teritory' | 'list' | 'emptyStyle'
  size?: 'sm' | 'md' | 'lg'
}

const BUTTON_VARIANTS = cva(
  'flex items-center justify-center font-semibold transition',
  {
    variants: {
      active: {
        primary: 'rounded-md text-white hover:opacity-85 active:animate-click',
        secondary: 'rounded-md ring-1 hover:opacity-85 active:animate-click',
        teritory: 'underline hover:opacity-85 active:animate-click',
        list: 'text-var-gray justify-start font-light hover:bg-gray-200',
        emptyStyle: 'hover:opacity-85',
      },
      disabled: {
        primary:
          'gap-2 rounded-md border border-gray-300 bg-gray-300 text-gray-50',
        secondary: '',
        teritory: '',
        list: '',
        emptyStyle: '',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-4 py-2 text-lg',
      },
    },
  },
)

const Button = forwardRef<HTMLButtonElement, PropsWithRef<ButtonProps>>(
  (
    {
      children,
      className,
      isLoading,
      onClick,
      disabled,
      type = 'button',
      size = 'md',
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    const { color } = useTheme()
    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={cn(
          color === 'blue' && variant === 'primary' && 'bg-var-blue',
          color === 'blue' && variant === 'secondary' && 'ring-var-blue text-var-blue', //prettier-ignore
          color === 'yellow' && variant === 'primary' && 'bg-var-yellow',
          color === 'yellow' && variant === 'secondary' && 'ring-var-yellow text-var-yellow', //prettier-ignore
          color === 'green' && variant === 'primary' && 'bg-var-green',
          color === 'green' && variant === 'secondary' && 'ring-var-green text-var-green', //prettier-ignore
          color === 'orange' && variant === 'primary' && 'bg-var-orange',
          color === 'orange' && variant === 'secondary' && 'ring-var-orange text-var-orange', //prettier-ignore
          color === 'gray' && variant === 'primary' && 'bg-var-gray',
          color === 'gray' && variant === 'secondary' && 'ring-var-gray text-var-gray', //prettier-ignore
          BUTTON_VARIANTS(
            isLoading || disabled
              ? { disabled: variant, size: size }
              : { active: variant, size: size },
          ),
          className,
        )}
        {...props}
      >
        {children}
        {isLoading && <Spinner size={Size.s} />}
      </button>
    )
  },
)

export default Button

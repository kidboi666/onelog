'use client'

import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'
import Spinner from './Spinner'
import { useTheme } from '@/store/useTheme'
import { formatButtonColor } from '@/utils/formatColor'

export interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'teritory' | 'list' | 'emptyStyle'
  size?: 'sm' | 'md' | 'lg' | 'none'
}

const BUTTON_VARIANTS = cva(
  'flex items-center justify-center font-semibold transition',
  {
    variants: {
      active: {
        primary:
          'rounded-md text-white ring-1 hover:opacity-65 active:animate-click',
        secondary:
          'rounded-md text-gray-600 ring-1 ring-gray-500 hover:opacity-65 active:animate-click dark:text-white dark:ring-gray-400',
        teritory:
          'underline hover:opacity-65 active:animate-click dark:text-white',
        list: 'text-var-gray justify-start font-light hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700',
        emptyStyle: 'hover:opacity-65',
      },
      disabled: {
        primary:
          'gap-2 rounded-md bg-gray-300 text-gray-50 ring-1 ring-gray-300 dark:bg-gray-600 dark:text-gray-500 dark:ring-gray-600',
        secondary: '',
        teritory: '',
        list: '',
        emptyStyle: '',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-4 py-2 text-lg',
        none: '',
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
          formatButtonColor(color, variant),
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
        {isLoading && <Spinner size={20} />}
      </button>
    )
  },
)

export default Button

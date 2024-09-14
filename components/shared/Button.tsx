'use client'

import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'
import Spinner from './Spinner'
import { useTheme } from '@/store/useTheme'
import { formatButtonColor } from '@/utils/formatColor'

export interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  variant?:
    | 'primary'
    | 'secondary'
    | 'teritory'
    | 'list'
    | 'emptyStyle'
    | 'icon'
  size?: 'sm' | 'md' | 'lg' | 'emptyStyle' | 'icon'
}

const BUTTON_VARIANTS = cva(
  'flex items-center justify-center font-semibold transition',
  {
    variants: {
      active: {
        primary: 'rounded-md text-white hover:opacity-65 active:animate-click',
        secondary:
          'rounded-md border border-var-gray text-var-black hover:opacity-65 active:animate-click dark:text-gray-200 dark:ring-gray-600',
        teritory:
          'underline hover:opacity-65 active:animate-click dark:text-gray-200',
        list: 'justify-start rounded-md font-normal text-var-black hover:bg-var-lightgray dark:text-gray-400 dark:hover:bg-var-dark',
        emptyStyle: 'hover:opacity-65',
        icon: 'rounded-md text-gray-400 transition hover:bg-gray-200 hover:opacity-65 active:animate-click dark:text-var-gray',
      },
      disabled: {
        primary:
          'gap-2 rounded-md bg-gray-300 text-gray-200 ring-1 ring-gray-300 dark:bg-gray-600 dark:text-gray-500 dark:ring-gray-600',
        secondary: '',
        teritory: '',
        list: '',
        emptyStyle: '',
        icon: '',
      },
      size: {
        sm: 'px-3 py-1 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-4 py-4 text-lg',
        emptyStyle: '',
        icon: 'p-2',
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
          color && formatButtonColor(color, variant),
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

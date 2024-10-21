'use client'

import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'
import Spinner from './Spinner'
import { colorTheme, useTheme } from '@/store/useTheme'
import { formatButtonColor } from '@/utils/formatColor'

export interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  dataStatus?: string
  variant?: 'primary' | 'secondary' | 'teritory' | 'list' | 'icon' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'none'
}

const BUTTON_VARIANTS = cva(
  'flex items-center justify-center text-nowrap font-semibold transition',
  {
    variants: {
      active: {
        primary: 'rounded-md text-white hover:opacity-65 active:animate-click',
        secondary:
          'rounded-md text-var-black ring-1 ring-zinc-400 hover:opacity-65 active:animate-click dark:text-zinc-200 dark:ring-zinc-500',
        teritory:
          'underline hover:opacity-65 active:animate-click dark:text-zinc-200',
        list: 'justify-start rounded-md font-normal text-zinc-600 hover:bg-var-lightgray dark:text-zinc-300 dark:hover:bg-var-dark dark:hover:text-zinc-200',
        none: '',
        icon: 'rounded-md text-zinc-400 transition hover:bg-var-lightgray dark:text-zinc-400 dark:hover:bg-var-dark dark:hover:text-zinc-300',
      },
      disabled: {
        primary:
          'gap-2 rounded-md bg-zinc-300 text-zinc-200 ring-1 ring-zinc-300 dark:bg-zinc-500 dark:text-zinc-400 dark:ring-zinc-500',
        secondary:
          'gap-2 rounded-md bg-zinc-300 text-zinc-200 ring-1 ring-zinc-300 dark:bg-zinc-500 dark:text-zinc-400 dark:ring-zinc-500',
        teritory: '',
        list: '',
        icon: 'rounded-md text-zinc-300 transition dark:text-zinc-600',
        none: '',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-3 py-3 text-sm',
        lg: 'px-4 py-4 text-lg',
        icon: 'p-2',
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
      dataStatus,
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
        data-status={dataStatus}
        onClick={onClick}
        type={type}
        className={cn(
          variant === 'primary' ? colorTheme({ color }) : '',
          BUTTON_VARIANTS(
            isLoading || disabled
              ? { disabled: variant, size }
              : { active: variant, size },
          ),
          className,
        )}
        {...props}
      >
        {children}
        {isLoading && (
          <div>
            <Spinner size={size === 'sm' ? 16 : 20} />
          </div>
        )}
      </button>
    )
  },
)

export default Button

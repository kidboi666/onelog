import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'
import Spinner, { Size } from './Spinner'

export interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'teritory' | 'list' | 'emptyStyle'
  size?: 'sm' | 'md' | 'lg'
}

const BUTTON_VARIANTS = cva('flex items-center justify-center transition', {
  variants: {
    active: {
      primary:
        'rounded-md border border-gray-800 bg-gray-800 font-semibold text-white hover:border-gray-600 hover:bg-gray-600 active:animate-click',
      secondary:
        'rounded-md border border-gray-400 hover:bg-gray-400 hover:text-white active:animate-click',
      teritory: 'underline hover:text-gray-400',
      list: 'justify-start hover:bg-gray-200',
      emptyStyle: '',
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
      sm: 'p-1 text-xs',
      md: 'p-2 text-sm',
      lg: 'p-2 text-lg',
    },
  },
})

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
    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={cn(
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

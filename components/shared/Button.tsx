import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'

interface Props extends ComponentProps<'button'> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const BUTTON_VARIANTS = cva('', {
  variants: {
    active: {
      primary: 'rounded-3xl bg-blue-400 text-white hover:bg-blue-500',
      secondary: '',
    },
    disabled: {
      primary: '',
      secondary: '',
    },
    size: {
      sm: '',
      md: 'px-4 py-1 text-sm',
      lg: '',
    },
  },
})

const Button = forwardRef<HTMLButtonElement, PropsWithRef<Props>>(
  (
    {
      children,
      className,
      isLoading,
      onClick,
      disabled,
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
      </button>
    )
  },
)

export default Button

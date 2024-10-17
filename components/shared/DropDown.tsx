import { forwardRef, PropsWithChildren, RefObject } from 'react'
import Button, { ButtonProps } from './Button'
import cn from '@/lib/cn'

interface DropDownTriggerProps extends ButtonProps {
  targetRef?: RefObject<HTMLButtonElement>
}

const DropDownTrigger = ({
  children,
  onTransitionEnd,
  onClick,
  variant = 'icon',
  size,
  targetRef,
}: DropDownTriggerProps) => {
  return (
    <Button
      ref={targetRef}
      variant={variant}
      size={size}
      onTransitionEnd={onTransitionEnd}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

interface DropDownWrapperProps {
  onTransitionEnd: () => void
  initStatus: string
  onClick?: (params: any) => void
  className?: string
  position?: 'up' | 'down'
}

const DROPDOWN_POSITION = {
  up: 'bottom-[calc(100%--6px)]',
  down: 'top-[calc(100%--6px)]',
}

const DropDownWrapper = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DropDownWrapperProps>
>(
  (
    {
      children,
      onTransitionEnd,
      initStatus,
      onClick,
      className,
      position = 'up',
    },
    ref,
  ) => {
    return (
      <nav
        ref={ref}
        onTransitionEnd={onTransitionEnd}
        data-status={initStatus}
        onClick={onClick}
        className={cn(
          'absolute hidden origin-top rounded-md bg-white shadow-md ring-1 ring-zinc-200 transition data-[status=closed]:scale-90 data-[status=closed]:opacity-0 dark:bg-var-dark dark:ring-zinc-700',
          DROPDOWN_POSITION[position],
          className,
        )}
      >
        {children}
      </nav>
    )
  },
)

interface DropDownButtonProps extends ButtonProps {
  className?: string
}

const DropDownButton = ({
  variant = 'list',
  size = 'sm',
  className,
  children,
  onClick,
}: DropDownButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn('w-full', className)}
    >
      {children}
    </Button>
  )
}

export const DropDown = {
  Trigger: DropDownTrigger,
  Wrapper: DropDownWrapper,
  Button: DropDownButton,
}

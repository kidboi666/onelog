import Link from 'next/link'
import { ComponentProps, PropsWithChildren, RefObject, forwardRef } from 'react'
import cn from '@/src/lib/cn'
import TextDisplay, { TextProps } from '@/src/components/TextDisplay'
import Button, { ButtonProps } from './Button'

interface DropDownRootProps extends ComponentProps<'div'> {
  className?: string
  targetRef?: RefObject<HTMLDivElement>
}

const DropDownRoot = ({
  children,
  className,
  targetRef,
  ...props
}: PropsWithChildren<DropDownRootProps>) => {
  return (
    <div ref={targetRef} className={cn('relative', className)} {...props}>
      {children}
    </div>
  )
}

interface DropDownTriggerProps extends ButtonProps {
  targetRef?: RefObject<HTMLButtonElement>
  className?: string
}

const DropDownTrigger = ({
  children,
  onTransitionEnd,
  onClick,
  variant = 'icon',
  size,
  targetRef,
  className,
  ...props
}: DropDownTriggerProps) => {
  return (
    <Button
      ref={targetRef}
      variant={variant}
      size={size}
      onTransitionEnd={onTransitionEnd}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}

interface DropDownContentProps extends ComponentProps<'div'> {
  onTransitionEnd?: () => void
  initStatus?: string
  onClick?: (params: any) => void
  className?: string
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}

const DROPDOWN_POSITION: Record<string, string> = {
  topLeft: 'bottom-[calc(100%--6px)] right-0 origin-bottom-right',
  topRight: 'bottom-[calc(100%--6px)] left-0 origin-bottom-left',
  bottomLeft: 'top-[calc(100%--6px)] right-0 origin-top-right',
  bottomRight: 'top-[calc(100%--6px)] left-0 origin-top-left',
}

const DropDownContent = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DropDownContentProps>
>(
  (
    {
      children,
      onTransitionEnd,
      initStatus,
      onClick,
      className,
      position = 'topRight',
      ...props
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
          'absolute z-50 hidden rounded-md bg-white p-1 shadow-lg ring-1 ring-zinc-200 transition data-[status=closed]:scale-95 data-[status=closed]:opacity-0 dark:bg-var-darkgray dark:ring-zinc-700',
          DROPDOWN_POSITION[position],
          className,
        )}
        {...props}
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
  variant = 'icon',
  size = 'sm',
  className,
  children,
  onClick,
  ...props
}: DropDownButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </Button>
  )
}

interface DropDownLinkButtonProps extends ButtonProps {
  href: string
  className?: string
  innerClassName?: string
}

const DropDownLinkButton = ({
  href,
  variant = 'primary',
  size = 'sm',
  onClick,
  children,
  className,
  innerClassName,
  ...props
}: PropsWithChildren<DropDownLinkButtonProps>) => {
  return (
    <Link href={href} className={className}>
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        className={innerClassName}
        {...props}
      >
        {children}
      </Button>
    </Link>
  )
}

interface DropDownTextProps extends TextProps {}

const DropDownText = ({
  children,
  ...props
}: PropsWithChildren<DropDownTextProps>) => {
  return <TextDisplay {...props}>{children}</TextDisplay>
}

export const DropDown = {
  Root: DropDownRoot,
  Trigger: DropDownTrigger,
  Content: DropDownContent,
  Button: DropDownButton,
  LinkButton: DropDownLinkButton,
  Text: DropDownText,
}

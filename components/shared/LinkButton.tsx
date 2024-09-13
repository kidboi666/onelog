import Link from 'next/link'
import Button, { ButtonProps } from './Button'
import { PropsWithChildren } from 'react'
import cn from '@/lib/cn'

interface Props extends ButtonProps {
  href: string
  innerClassName?: string
}

export default function LinkButton({
  children,
  className,
  innerClassName,
  href,
  size,
  variant,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Link href={href} className={cn('h-full w-full', className)}>
      <Button
        variant={variant}
        size={size}
        {...props}
        className={cn('h-full w-full', innerClassName)}
      >
        {children}
      </Button>
    </Link>
  )
}

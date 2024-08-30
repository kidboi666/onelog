import Link from 'next/link'
import Button, { ButtonProps } from './Button'
import { PropsWithChildren } from 'react'
import cn from '@/lib/cn'

interface Props extends ButtonProps {
  href: string
}

export default function LinkButton({
  children,
  className,
  href,
  variant,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Link href={href} className={cn('h-full w-full', className)}>
      <Button variant={variant} {...props} className="h-full w-full">
        {children}
      </Button>
    </Link>
  )
}

import Link from 'next/link'
import Button, { ButtonProps } from './Button'
import { PropsWithChildren } from 'react'

interface Props extends ButtonProps {
  href: string
}

export default function LinkButton({
  children,
  href,
  variant,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Link href={href} className="size-full">
      <Button variant={variant} {...props}>
        {children}
      </Button>
    </Link>
  )
}

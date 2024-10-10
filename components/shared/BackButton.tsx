'use client'

import { useRouter } from 'next/navigation'
import Button, { ButtonProps } from './Button'
import cn from '@/lib/cn'
import { PropsWithChildren } from 'react'

interface Props extends ButtonProps {}

export default function BackButton({
  className,
  variant = 'icon',
  children,
}: PropsWithChildren<Props>) {
  const router = useRouter()
  const handleButtonClick = () => {
    router.back()
  }
  return (
    <Button
      variant={variant}
      onClick={handleButtonClick}
      className={cn(
        'absolute right-0 top-0 w-10 self-end rounded-full hover:bg-zinc-300',
        className,
      )}
    >
      {children ? children : '<'}
    </Button>
  )
}

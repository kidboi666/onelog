'use client'

import { useRouter } from 'next/navigation'
import Button, { ButtonProps } from './Button'
import cn from '@/lib/cn'
import { PropsWithChildren } from 'react'
import Icon from './Icon'

interface Props extends ButtonProps {}

export default function BackButton({
  className,
  children,
}: PropsWithChildren<Props>) {
  const router = useRouter()
  const handleButtonClick = () => {
    router.back()
  }
  return (
    <Button
      variant="icon"
      size="none"
      onClick={handleButtonClick}
      className={cn('p-1', className)}
    >
      {children ? (
        children
      ) : (
        <Icon view="0 -960 960 960" size={14}>
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </Icon>
      )}
    </Button>
  )
}

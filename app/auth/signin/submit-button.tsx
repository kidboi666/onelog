'use client'

import Button from '@/components/shared/Button'
import { ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'

interface Props extends ComponentProps<'button'> {
  pendingText?: string
}

export default function SubmitButton({
  children,
  pendingText,
  ...props
}: Props) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <Button {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </Button>
  )
}

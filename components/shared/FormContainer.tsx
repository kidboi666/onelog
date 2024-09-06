import { ComponentProps, PropsWithChildren } from 'react'

interface Props extends ComponentProps<'form'> {}

export default function FormContainer({
  children,
  ...Props
}: PropsWithChildren<Props>) {
  return <form {...Props}>{children}</form>
}

import { ComponentProps, PropsWithChildren } from 'react'

interface Props extends ComponentProps<'form'> {}

export default function FormContainer({
  children,
  className,
  ...Props
}: PropsWithChildren<Props>) {
  return (
    <form className={className} {...Props}>
      {children}
    </form>
  )
}

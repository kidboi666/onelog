import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  Header?: ReactNode
  Footer?: ReactNode
}

export default function AppLayout({
  Header,
  Footer,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {Header && Header}
      {children}
      {Footer && Footer}
    </>
  )
}

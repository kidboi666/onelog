import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  modal: ReactNode
  header: ReactNode
}

export default function MyPageLayout({
  children,
  modal,
  header,
}: PropsWithChildren<Props>) {
  return (
    <>
      {header}
      {modal}
      {children}
    </>
  )
}

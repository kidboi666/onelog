import { PropsWithChildren, ReactNode } from 'react'
import Portal from '@/components/shared/Portal'

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
      {children}
      <Portal>{modal}</Portal>
    </>
  )
}

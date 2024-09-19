import Portal from '@/components/shared/Portal'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  modal: ReactNode
  header: ReactNode
}

export default function Layout({
  children,
  modal,
  header,
}: PropsWithChildren<Props>) {
  return (
    <>
      {header}
      <Portal>{modal}</Portal>
      {children}
    </>
  )
}

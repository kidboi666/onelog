import { PropsWithChildren, ReactNode } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Header from '@/components/layout/header/Header'
import Portal from '@/components/portal/Portal'

interface Props {
  modal: ReactNode
}

export default function ProtectedLayout({
  children,
  modal,
}: PropsWithChildren<Props>) {
  return (
    <>
      <AppLayout Header={<Header />}>{children}</AppLayout>
      <Portal>{modal}</Portal>
    </>
  )
}

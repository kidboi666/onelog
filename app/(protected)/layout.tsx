import AppLayout from '@/components/layout/AppLayout'
import Header from '@/components/layout/header/Header'
import Portal from '@/components/portal/Portal'
import ModalProvider from '@/providers/modal-provider'
import { PropsWithChildren } from 'react'

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppLayout Header={<Header />}>{children}</AppLayout>
      <Portal>
        <ModalProvider />
      </Portal>
    </>
  )
}

import { PropsWithChildren } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Header from '@/components/layout/header/Header'
import ModalProvider from '@/components/modals/ModalProvider'
import Portal from '@/components/portal/Portal'

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

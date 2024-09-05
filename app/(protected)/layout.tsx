import { PropsWithChildren, ReactNode } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Header from '@/components/layout/Header/Header'
import Portal from '@/components/shared/Portal'
import Background from '@/components/layout/Background'

interface Props {
  modal: ReactNode
}

export default function ProtectedLayout({
  children,
  modal,
}: PropsWithChildren<Props>) {
  return (
    <>
      <AppLayout Header={<Header />} Background={<Background />}>
        {children}
      </AppLayout>
      <Portal>{modal}</Portal>
    </>
  )
}

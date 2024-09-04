import { PropsWithChildren } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Header from '@/components/layout/header/Header'

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return <AppLayout Header={<Header />}>{children}</AppLayout>
}

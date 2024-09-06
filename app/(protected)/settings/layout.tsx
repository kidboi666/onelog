import Container from '@/components/shared/Container'
import Portal from '@/components/shared/Portal'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  modal: ReactNode
}

export default function SettingsLayout({
  children,
  modal,
}: PropsWithChildren<Props>) {
  return (
    <Container className="mt-20 flex w-full animate-fade-in flex-col gap-24 px-4 md:max-w-[560px]">
      {children}
      <Portal>{modal}</Portal>
    </Container>
  )
}

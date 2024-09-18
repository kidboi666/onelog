import Container from '@/components/shared/Container'
import Portal from '@/components/shared/Portal'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  sidebar: ReactNode
  task_manager: ReactNode
  modal: ReactNode
}

export default function Layout({
  sidebar,
  task_manager,
  children,
  modal,
}: PropsWithChildren<Props>) {
  return (
    <Container className="flex w-full animate-fade-in flex-row">
      {sidebar}
      {task_manager}
      <Portal>{modal}</Portal>
      {children}
    </Container>
  )
}

import Portal from '@/components/shared/Portal'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  modal: ReactNode
  header: ReactNode
  side_menu: ReactNode
}

export default function Layout({
  header,
  side_menu,
  modal,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {header}
      {side_menu}
      <Portal>{modal}</Portal>
      {children}
    </>
  )
}

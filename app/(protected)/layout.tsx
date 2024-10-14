import Portal from '@/components/shared/Portal'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  modal: ReactNode
  header: ReactNode
  sidebar: ReactNode
}

export default function Layout({
  header,
  sidebar,
  modal,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {header}
      <Portal>{modal}</Portal>
      <div className="invisible sm:visible">{sidebar}</div>
      <div className="sm:ml-[74px]">{children}</div>
    </>
  )
}

import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  modal: ReactNode
  header: ReactNode
  sidebar: ReactNode
  auth_modal: ReactNode
}

export default function Layout({
  header,
  sidebar,
  modal,
  children,
  auth_modal,
}: PropsWithChildren<Props>) {
  return (
    <>
      {header}
      {modal}
      {auth_modal}
      <div className="invisible sm:visible">{sidebar}</div>
      <div className="sm:ml-[74px]">{children}</div>
    </>
  )
}

import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  header: ReactNode
  sidebar: ReactNode
}

export default function Layout({
  header,
  sidebar,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {header}
      <div className="invisible sm:visible">{sidebar}</div>
      <div className="sm:ml-[74px]">{children}</div>
    </>
  )
}

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
      <div className="hidden sm:block">{sidebar}</div>
      <div className="sm:ml-[80px]">{children}</div>
    </>
  )
}

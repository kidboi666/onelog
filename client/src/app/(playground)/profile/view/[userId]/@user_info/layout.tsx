import { PropsWithChildren } from 'react'

interface Props {
  params: { userId: string }
}

export default function Layout({
  params: { userId },
  children,
}: PropsWithChildren<Props>) {
  return <>{children}</>
}

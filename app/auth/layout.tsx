import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  )
}

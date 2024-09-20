import { PropsWithChildren } from 'react'
import AuthLogoSection from './_components/AuthLogoSection'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <AuthLogoSection />
      <div className="flex w-full flex-col items-center justify-center gap-12 p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}

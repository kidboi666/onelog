import Image from 'next/image'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="relative h-40 w-full">
        <Image src="logo_horizontal.svg" fill alt="로고 이미지" />
      </div>
      <div className="flex flex-col justify-center gap-12 p-8">
        <div>{children}</div>
      </div>
    </div>
  )
}

'use client'

import HeaderNavSection from './HeaderNavSection'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b bg-white/90 p-4 backdrop-blur-2xl md:h-28 md:items-start md:px-12">
      <div
        onClick={() => router.push('/mypage')}
        className="relative h-full w-24 cursor-pointer md:w-40"
      >
        <Image src="/logo_horizontal.svg" fill alt="하루한줄 로고" />
      </div>
      <HeaderNavSection />
    </header>
  )
}

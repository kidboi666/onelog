import HeaderNavSection from './HeaderNavSection'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b bg-white/90 px-12 py-2 backdrop-blur-2xl">
      <Link href="/" className="relative h-full w-28">
        <Image src="/logo-horizontal.svg" fill alt="하루한줄 로고" />
      </Link>
      <HeaderNavSection />
    </header>
  )
}

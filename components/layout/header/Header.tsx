import LinkButton from '@/components/shared/LinkButton'
import HeaderNavSection from './HeaderNavSection'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-fit w-full items-center justify-end border-b bg-white/90 px-4 py-2 backdrop-blur-2xl md:px-12">
      <div className="absolute left-4 h-full w-32">
        <LinkButton
          variant="emptyStyle"
          href="/mypage"
          className="relative size-full"
        >
          <Image src="/logo-horizontal.svg" fill alt="하루한줄 로고" />
        </LinkButton>
      </div>
      <HeaderNavSection />
    </header>
  )
}

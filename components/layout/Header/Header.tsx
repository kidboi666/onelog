import HeaderNavSection from './HeaderNavSection'
import Container from '@/components/shared/Container'
import HeaderLogoSection from './HeaderLogoSection'

export default function Header() {
  return (
    <Container
      as="header"
      isBlur
      className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-var-gray p-4 md:h-28 md:items-start lg:px-12"
    >
      <HeaderLogoSection />
      <HeaderNavSection />
    </Container>
  )
}

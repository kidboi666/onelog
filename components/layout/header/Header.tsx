import HeaderNavSection from './HeaderNavSection'
import Container from '@/components/shared/Container'
import HeaderLogoSection from './HeaderLogoSection'

export default function Header() {
  return (
    <Container
      as="header"
      className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-300 bg-white/50 p-4 backdrop-blur-md md:h-28 md:items-start lg:px-12 dark:border-gray-600 dark:bg-var-dark/50"
    >
      <HeaderLogoSection />
      <HeaderNavSection />
    </Container>
  )
}

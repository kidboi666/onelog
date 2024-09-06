import Container from '@/components/shared/Container'
import HomeLogoSection from './_components/HomeLogoSection'
import AuthCtaSection from './_components/AuthCtaSection'

export default function MainPage() {
  return (
    <Container className="flex h-screen w-full flex-col items-center justify-center md:flex-row">
      <HomeLogoSection />
      <AuthCtaSection />
    </Container>
  )
}

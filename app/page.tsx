import HomeLogoSection from './_components/HomeLogoSection'
import AuthCtaSection from './_components/AuthCtaSection'
import { YStack } from '@/components/shared/Stack'

export default function MainPage() {
  return (
    <YStack className="h-screen w-full items-center justify-center md:flex-row">
      <HomeLogoSection />
      <AuthCtaSection />
    </YStack>
  )
}

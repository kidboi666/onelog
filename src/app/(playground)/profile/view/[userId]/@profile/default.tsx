import { Container } from '@/src/components/Container'
import Line from '@/src/components/Line'
import { YStack } from '@/src/components/Stack'

import ProfileAboutMe from '@/src/app/(playground)/profile/view/[userId]/@profile/_components/ProfileAboutMe'
import ProfileHeader from '@/src/app/(playground)/profile/view/[userId]/@profile/_components/ProfileHeader'
import RenderActionButtonFromProfile from '@/src/app/(playground)/profile/view/[userId]/@profile/_components/RenderActionButtonFromProfile'
import RenderFollowButtonFromProfile from '@/src/app/(playground)/profile/view/[userId]/@profile/_components/RenderFollowButtonFromProfile'

interface Props {
  params: { userId: string }
}

export default function AboutMe({ params }: Props) {
  const userId = params.userId

  return (
    <Container className="rounded-md bg-white p-8 shadow-sm transition max-lg:py-4 dark:bg-var-darkgray">
      <YStack gap={4} className="items-center justify-center">
        <ProfileHeader userId={userId} />
        <Line className="w-full" />
        <ProfileAboutMe userId={userId} />
        <RenderFollowButtonFromProfile userId={userId} />
        <RenderActionButtonFromProfile userId={userId} />
      </YStack>
    </Container>
  )
}

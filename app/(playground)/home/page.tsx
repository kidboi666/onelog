import { Metadata } from 'next'
import PostSentenceContainer from './_containers/PostSentenceContainer'
import SentenceContainer from './_containers/SentenceContainer'
import { YStack } from '@/components/shared/Stack'

export const metadata: Metadata = {
  title: 'Home',
}

export default function HomePage() {
  return (
    <YStack gap={8} className="animate-fade-in">
      <PostSentenceContainer />
      <SentenceContainer />
    </YStack>
  )
}

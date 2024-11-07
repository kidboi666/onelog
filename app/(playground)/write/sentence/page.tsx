import PostContainer from './_containers/PostContainer'
import DateLabelContainer from './_containers/DateLabelContainer'
import { YStack } from '@/components/shared/Stack'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Write',
}

export default function PostSentencePage() {
  return (
    <YStack gap={4} className="animate-fade-in">
      <DateLabelContainer />
      <PostContainer />
    </YStack>
  )
}

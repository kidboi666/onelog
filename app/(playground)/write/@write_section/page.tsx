import { YStack } from '@/components/shared/Stack'
import { Metadata } from 'next'
import PostContainer from './_containers/PostContainer'

export const metadata: Metadata = {
  title: 'Write',
}

export default function Default() {
  return (
    <YStack gap={4} className="flex-1 animate-fade-in">
      {/* <DateLabelContainer /> */}
      <PostContainer />
    </YStack>
  )
}

import { Metadata } from 'next'

import { YStack } from '@/src/components/Stack'

import FakeFormContainer from './_components/FakeFormContainer'
import PostContainer from './_components/PostContainer'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return (
    <YStack gap={12} className="animate-fade-in">
      <FakeFormContainer />
      <PostContainer />
    </YStack>
  )
}

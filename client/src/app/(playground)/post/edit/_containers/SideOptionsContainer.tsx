import { useEffect } from 'react'
import { AccessType, PostType } from '@/src/types/enums'
import Line from '@/src/components/Line'
import { YStack } from '@/src/components/Stack'
import EmotionSection from '../_components/EmotionSection'
import PostTypeSection from '../_components/PostTypeSection'
import PublishSection from '../_components/PublishSection'
import { TEmotion } from '../page'

interface Props {
  searchParams: { post_id: string }
  selectedEmotion: TEmotion
  onChangeEmotion: (emotion: TEmotion) => void
  accessType: AccessType
  onChangeAccessType: (accessType: AccessType) => void
  postType: PostType
  onChangePostType: (postType: PostType) => void
}

export default function SideOptionsContainer({
  selectedEmotion,
  onChangeEmotion,
  accessType,
  onChangeAccessType,
  postType,
  onChangePostType,
}: Props) {
  useEffect(() => {
    postType === 'article' ? onChangeEmotion(null) : onChangeEmotion('50%')
  }, [postType])

  return (
    <div className="sticky left-4 top-8 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <YStack as="nav" className="items-center">
        <PublishSection
          accessType={accessType}
          onChangeAccessType={onChangeAccessType}
          isSide
        />
        <PostTypeSection
          postType={postType}
          onChangePostType={onChangePostType}
          isSide
        />
        <Line className="w-full" />
        <EmotionSection
          selectedEmotion={selectedEmotion}
          onChangeEmotion={onChangeEmotion}
          isSide
        />
      </YStack>
    </div>
  )
}

import { Access, EmotionLevel, PostType } from '@/src/types/enums/index'
import { XStack } from '@/src/components/Stack'
import EmotionSection from '@/src/app/(playground)/post/edit/_components/EmotionSection'
import PostTypeSection from '@/src/app/(playground)/post/edit/_components/PostTypeSection'
import PublishSection from '@/src/app/(playground)/post/edit/_components/PublishSection'

interface Props {
  accessType: Access
  postType: PostType
  emotionLevel: EmotionLevel | null
  onChangeAccessType: (accessType: Access) => void
  onChangePostType: (postType: PostType) => void
  onChangeEmotion: (emotionLevel: EmotionLevel | null) => void
}

export default function MobileOptionSection({
  accessType,
  postType,
  emotionLevel,
  onChangeAccessType,
  onChangePostType,
  onChangeEmotion,
}: Props) {
  return (
    <XStack gap={4} className="items-center sm:hidden">
      <PublishSection
        accessType={accessType}
        onChangeAccessType={onChangeAccessType}
      />
      <PostTypeSection
        postType={postType}
        onChangePostType={onChangePostType}
      />
      <EmotionSection
        selectedEmotion={emotionLevel}
        onChangeEmotion={onChangeEmotion}
      />
    </XStack>
  )
}

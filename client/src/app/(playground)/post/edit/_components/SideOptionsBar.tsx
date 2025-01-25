import { AccessType, EmotionLevel, PostType } from '@/src/types/enums/index'
import Line from '@/src/components/Line'
import { YStack } from '@/src/components/Stack'
import EmotionSection from '@/src/app/(playground)/post/edit/_components/EmotionSection'
import PostTypeSection from '@/src/app/(playground)/post/edit/_components/PostTypeSection'
import PublishSection from '@/src/app/(playground)/post/edit/_components/PublishSection'

interface Props {
  accessType: AccessType
  emotionLevel: EmotionLevel | null
  postType: PostType
  onChangeEmotion: (emotionLevel: EmotionLevel | null) => void
  onChangePostType: (postType: PostType) => void
  onChangeAccessType: (accessType: AccessType) => void
}

export default function SideOptionsBar({
  accessType,
  emotionLevel,
  postType,
  onChangeEmotion,
  onChangePostType,
  onChangeAccessType,
}: Props) {
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
        {emotionLevel && (
          <>
            <Line className="w-full" />
            <EmotionSection
              selectedEmotion={emotionLevel}
              onChangeEmotion={onChangeEmotion}
              isSide
            />
          </>
        )}
      </YStack>
    </div>
  )
}

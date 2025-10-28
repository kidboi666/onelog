import { EmotionLevel } from '@/src/types/enums/index'
import useToggle from '@/src/hooks/useToggle'
import { XStack, ZStack } from '@/src/components/Stack'
import ToolTip from '@/src/components/Tooltip'
import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import EmotionButtonWithDropDown from './EmotionButtonWithDropDown'
import NameWithDateSection from './NameWithDateSection'

interface Props {
  avatarUrl: string | null
  userName: string | null
  email: string | null
  emotionLevel: EmotionLevel | null
  createdAt: string
  userId: string
  createdAtLiked?: string
  postType: 'journal' | 'article'
}

export default function PostHeader({
  avatarUrl,
  userName,
  email,
  createdAtLiked,
  emotionLevel,
  userId,
  createdAt,
  postType,
}: Props) {
  const { isOpen: isHover, open: hover, close: leave } = useToggle()

  return (
    <XStack className="w-full items-end">
      <AvatarButtonWithDropDown
        avatarUrl={avatarUrl}
        userId={userId}
        userName={userName}
        position="bottomRight"
      />
      <XStack className="flex-1 items-end">
        <NameWithDateSection
          userName={userName}
          email={email}
          createdAt={createdAt}
          createdAtLiked={createdAtLiked}
          postType={postType}
        />
      </XStack>
      {emotionLevel && (
        <ZStack>
          <div onMouseEnter={hover} onMouseLeave={leave}>
            <EmotionButtonWithDropDown emotionLevel={emotionLevel} />
            <ToolTip
              isHover={isHover}
              position="bottomRight"
              text="감정 농도"
            />
          </div>
        </ZStack>
      )}
    </XStack>
  )
}

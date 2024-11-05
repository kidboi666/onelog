import ToolTip from '@/components/shared/Tooltip'
import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import EmotionButtonWithDropDown from './EmotionButtonWithDropDown'
import NameWithDateSection from './NameWithDateSection'
import useToggle from '@/hooks/useToggle'
import { XStack, ZStack } from '@/components/shared/Stack'
import { Container } from '@/components/shared/Container'
import { TEmotion } from '../../write/sentence/_containers/PostContainer'

interface Props {
  avatarUrl: string | null
  userName: string | null
  email: string | null
  emotionLevel: TEmotion
  createdAt: string
  userId: string
  meId?: string | null
  postType: 'journal' | 'article'
  followers: any
  followings: any
  isMe: boolean
  isFollowing: boolean
  isModal?: boolean
  onClick?: () => void
}

export default function SentenceHeader({
  avatarUrl,
  userName,
  email,
  emotionLevel,
  userId,
  createdAt,
  meId,
  followers,
  postType,
  followings,
  isMe,
  isFollowing,
}: Props) {
  const { isOpen: isHover, open: hover, close: leave } = useToggle()

  return (
    <XStack className="w-full items-end">
      <AvatarButtonWithDropDown
        avatarUrl={avatarUrl}
        followers={followers}
        followings={followings}
        isMe={isMe}
        isFollowing={isFollowing}
        meId={meId}
        userId={userId}
        userName={userName}
      />
      <XStack className="flex-1 items-end">
        <NameWithDateSection
          userName={userName}
          email={email}
          createdAt={createdAt}
          postType={postType}
        />
      </XStack>
      {emotionLevel && (
        <ZStack>
          <Container onMouseEnter={hover} onMouseLeave={leave}>
            <EmotionButtonWithDropDown emotionLevel={emotionLevel} />
            <ToolTip
              isHover={isHover}
              position="bottomRight"
              text="감정 농도"
            />
          </Container>
        </ZStack>
      )}
    </XStack>
  )
}

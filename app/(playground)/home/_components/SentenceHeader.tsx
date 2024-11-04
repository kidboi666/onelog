import ToolTip from '@/components/shared/Tooltip'
import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import EmotionButtonWithDropDown from './EmotionButtonWithDropDown'
import NameSection from './NameSection'
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
  meId: string | null
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
      <NameSection userName={userName} email={email} />
      <ZStack>
        <Container onMouseEnter={hover} onMouseLeave={leave}>
          <EmotionButtonWithDropDown emotionLevel={emotionLevel} />
          <ToolTip isHover={isHover} position="bottomRight" text="감정 농도" />
        </Container>
      </ZStack>
    </XStack>
  )
}

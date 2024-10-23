import ToolTip from '@/components/shared/Tooltip'
import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import EmotionButtonWithDropDown from './EmotionButtonWithDropDown'
import NameSection from './NameSection'
import useToggle from '@/hooks/useToggle'

interface Props {
  avatarUrl: string | null
  userName: string | null
  email: string | null
  emotionLevel: string
  createdAt: string
  userId: string
  meId: string
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
    <div className="flex w-full items-end gap-2">
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
      <div onMouseEnter={hover} onMouseLeave={leave} className="relative">
        <EmotionButtonWithDropDown emotionLevel={emotionLevel} />
        <ToolTip isHover={isHover} position="bottomRight" text="감정 농도" />
      </div>
    </div>
  )
}

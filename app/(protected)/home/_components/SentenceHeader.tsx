import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import EmotionButtonWithDropDown from './EmotionButtonWithDropDown'
import NameSection from './NameSection'

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
      <EmotionButtonWithDropDown emotionLevel={emotionLevel} />
    </div>
  )
}

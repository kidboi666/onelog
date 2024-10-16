import useStateChange from '@/hooks/useStateChange'
import Title from '@/components/shared/Title'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import Avatar from '@/components/feature/user/Avatar'
import EmotionGauge from '../SentenceContent/EmotionGauge'
import AvatarOwnerInfoDropDown from '../dropdown/AvatarOwnerInfoDropDown'
import ExpandButton from '@/components/shared/ExpandButton'
import BackButton from '@/components/shared/BackButton'
import useOutsideClick from '@/hooks/useOutsideClick'

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
  isModal = false,
}: Props) {
  const { open, close, ref, onClick, onTransitionEnd } =
    useStateChange<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <div className="flex w-full gap-2">
      <div className="relative">
        <Button
          ref={buttonRef}
          variant="none"
          onClick={onClick}
          className="p-0"
        >
          <Avatar src={avatarUrl} size="sm" shadow="sm" />
        </Button>
        <AvatarOwnerInfoDropDown
          targetRef={ref}
          isMe={isMe}
          isFollowing={isFollowing}
          followers={followers}
          followings={followings}
          userId={userId}
          meId={meId}
          avatarUrl={avatarUrl}
          userName={userName}
          onTransitionEnd={onTransitionEnd}
        />
      </div>
      <div className="flex h-full w-full flex-col">
        <Title size="xs" type="sub" className="line-clamp-1">
          {userName}
        </Title>
        <div className="flex gap-2">
          <Text type="caption" size="sm">
            @{email?.split('@')[0]}
          </Text>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {isModal && (
          <div className="flex w-full justify-end gap-2">
            <ExpandButton />
            <BackButton />
          </div>
        )}
        <EmotionGauge emotionLevel={emotionLevel} />
      </div>
    </div>
  )
}

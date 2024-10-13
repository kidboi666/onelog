import useStateChange from '@/hooks/useStateChange'
import Title from '@/components/shared/Title'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import Avatar from '@/components/feature/user/Avatar'
import EmotionGauge from '../SentenceContent/EmotionGauge'
import AvatarOwnerInfoDropDown from '../dropdown/AvatarOwnerInfoDropDown'

interface Props {
  avatarUrl: string | null
  userName: string | null
  email: string | null
  emotionLevel: string
  createdAt: string
  userId: string
  meId: string
  isMe: boolean
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
  isMe,
  onClick,
}: Props) {
  const { open, close, ref, onTransitionEnd } = useStateChange<HTMLDivElement>()

  return (
    <div className="flex w-full gap-2">
      <div onMouseEnter={open} onMouseLeave={close} className="relative">
        <Button variant="none" onClick={onClick} className="p-0">
          <Avatar src={avatarUrl} size="sm" shadow="sm" />
        </Button>
        <AvatarOwnerInfoDropDown
          targetRef={ref}
          isMe={isMe}
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
      <EmotionGauge emotionLevel={emotionLevel} />
    </div>
  )
}

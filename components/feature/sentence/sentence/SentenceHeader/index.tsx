import useStateChange from '@/hooks/useStateChange'
import Title from '@/components/shared/Title'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import Avatar from '@/components/feature/user/Avatar'
import SentenceOwnerInfoDropDown from '../../dropdown/SentenceOwnerInfoDropDown'
import EmotionGauge from '../SentenceContent/EmotionGauge'

interface Props {
  avatarUrl: string | null
  userName: string | null
  email: string | null
  emotionLevel: string
  createdAt: string
  isMe: boolean
  onClick?: () => void
}

export default function SentenceHeader({
  avatarUrl,
  userName,
  email,
  emotionLevel,
  createdAt,
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
        <SentenceOwnerInfoDropDown
          targetRef={ref}
          isMe={isMe}
          avatarUrl={avatarUrl}
          userName={userName}
          onTransitionEnd={onTransitionEnd}
        />
      </div>
      <div className="flex w-full flex-col">
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

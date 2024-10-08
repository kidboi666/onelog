import Title from '@/components/shared/Title'
import Avatar from '../../user/Avatar'
import Text from '@/components/shared/Text'
import { formatDateToHM, formatDateToYMD } from '@/utils/formatDate'
import Button from '@/components/shared/Button'
import useStateChange from '@/hooks/useStateChange'
import SentenceOwnerInfoDropDown from './SentenceOwnerInfoDropDown'

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
      <div
        className="relative size-fit"
        onMouseEnter={open}
        onMouseLeave={close}
      >
        <Button variant="emptyStyle" onClick={onClick} className="p-0">
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
      <div className="flex flex-col">
        <Title size="xs" type="sub">
          {userName}
          {/* <Text as="span" size="sm" type="caption">
            {' '}
            님의 하루 한줄
          </Text> */}
        </Title>
        <div className="flex items-center gap-2">
          <Text type="caption" size="sm">
            {email}
          </Text>
          {/* <Text size="sm">
            감정 농도
            <Text as="span" className="text-var-blue opacity-50">
              {' '}
              {emotionLevel}
            </Text>
          </Text> */}
          {/* <Text as="span" size="xs" type="caption">
            {' '}
            {formatDateToYMD(createdAt)}
            {' ・ '}
            {formatDateToHM(createdAt)}
          </Text> */}
        </div>
      </div>
    </div>
  )
}

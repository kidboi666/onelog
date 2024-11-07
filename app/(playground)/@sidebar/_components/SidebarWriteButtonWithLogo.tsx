import Icon from '@/components/shared/Icon'
import BookMark from './BookMark'
import SelectedMenuBackground from './SelectedMenuBackground'
import Button from '@/components/shared/Button'
import { useRouter } from 'next/navigation'
import { IUserSession } from '@/services/queries/auth/meQuery'
import { ZStack } from '@/components/shared/Stack'

interface Props {
  me: IUserSession | null
  isSelected?: boolean
  closeToolTip: () => void
}

export default function SidebarWriteButtonWithLogo({
  isSelected,
  me,
  closeToolTip,
}: Props) {
  const router = useRouter()

  const pushWritePage = () => {
    me ? router.push('/write') : router.push('/auth_guard')

    closeToolTip()
  }

  return (
    <ZStack>
      <BookMark isSelected={isSelected} />
      <Button variant="icon" size="icon" onClick={pushWritePage}>
        <SelectedMenuBackground isSelected={isSelected} />
        <Icon view="0 0 336 336" size={30}>
          <ellipse cx="83" cy="323" rx="83" ry="21" fill="#D9D9D9" />
          <path d="M83 322.994L197.5 77C226 12 301 9.99998 335.5 20.9999C309.9 26.4867 244.333 159.307 221.432 221.111C206.547 227.452 175.468 234.026 161.789 236.52C180.627 236.946 204.296 234.084 213.776 232.599C215.388 235.864 211.839 245.619 184.749 258.515C143.16 261.651 113.159 289.745 103.5 302.866C103.5 302.866 112.5 303 118 304C123.5 305 97.0341 316.047 97.0341 316.047L165.5 322.994L83 322.994Z" />
        </Icon>
      </Button>
    </ZStack>
  )
}

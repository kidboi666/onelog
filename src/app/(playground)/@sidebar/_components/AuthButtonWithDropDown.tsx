import { IUserSession } from '@/src/types/auth'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import Avatar from '@/src/components/Avatar'
import { DropDown } from '@/src/components/DropDown'
import Text from '@/src/components/Text'
import BookMark from './BookMark'
import GuestContent from './GuestContent'
import LoggedInContent from './LoggedInContent'

interface Props {
  pathname: string
  userId: string
  viewText?: boolean
  session: IUserSession
  closeMenu?: () => void
}

export default function AuthButtonWithDropDown({
  pathname,
  userId,
  viewText,
  session,
  closeMenu,
}: Props) {
  const { ref, close, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <DropDown.Root className="group">
      <BookMark session={session} userId={userId} pathname={pathname} />
      <DropDown.Trigger
        targetRef={buttonRef}
        variant="none"
        onClick={onClick}
        className="gap-4 px-1 py-1"
      >
        <Avatar
          src={session?.avatar_url}
          ring
          shadow="sm"
          className="size-10"
        />
        <Text type="caption">{viewText && session?.email}</Text>
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        onTransitionEnd={onTransitionEnd}
        position="topRight"
      >
        {session ? (
          <LoggedInContent session={session} closeMenu={closeMenu} />
        ) : (
          <GuestContent closeMenu={closeMenu} />
        )}
      </DropDown.Content>
    </DropDown.Root>
  )
}

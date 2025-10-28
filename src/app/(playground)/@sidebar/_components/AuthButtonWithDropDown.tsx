import { IUserInfo } from '@/src/types/entities/auth'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import Avatar from '@/src/components/Avatar'
import { DropDown } from '@/src/components/DropDown'
import TextDisplay from '@/src/components/TextDisplay'
import BookMark from './BookMark'
import GuestContent from './GuestContent'
import LoggedInContent from './LoggedInContent'

interface Props {
  pathname: string
  userId: string
  me: IUserInfo | null
  viewText?: boolean
  closeMenu?: () => void
}

export default function AuthButtonWithDropDown({
  pathname,
  userId,
  me,
  viewText,
  closeMenu,
}: Props) {
  const { ref, close, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <DropDown.Root className="group">
      <BookMark meId={me?.id} userId={userId} pathname={pathname} />
      <DropDown.Trigger
        targetRef={buttonRef}
        variant="none"
        onClick={onClick}
        className="gap-4 px-1 py-1"
      >
        <Avatar src={me?.avatarUrl} ring shadow="sm" className="size-10" />
        <TextDisplay type="caption">{viewText && me?.email}</TextDisplay>
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        onTransitionEnd={onTransitionEnd}
        position="topRight"
      >
        {me ? (
          <LoggedInContent
            email={me.email}
            userName={me.userName}
            meId={me.id}
            closeMenu={closeMenu}
          />
        ) : (
          <GuestContent closeMenu={closeMenu} />
        )}
      </DropDown.Content>
    </DropDown.Root>
  )
}

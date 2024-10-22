import Avatar from '@/components/shared/Avatar'
import { DropDown } from '@/components/shared/DropDown'
import Text from '@/components/shared/Text'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import { IUserSession } from '@/services/queries/auth/meQuery'
import BookMark from './BookMark'
import useOutsideClick from '@/hooks/useOutsideClick'
import LoggedInContent from './LoggedInContent'
import GuestContent from './GuestContent'

interface Props {
  isOpen: boolean
  pathname: string
  userId: string
  me: IUserSession | null
  closeSidebar: () => void
}

export default function AuthButtonWithDropDown({
  isOpen,
  pathname,
  userId,
  me,
  closeSidebar,
}: Props) {
  const { ref, close, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <DropDown.Root className="group">
      <BookMark me={me} userId={userId} pathname={pathname} />
      <DropDown.Trigger
        targetRef={buttonRef}
        variant="none"
        onClick={onClick}
        className="justify-start gap-4 px-1 py-1"
      >
        <Avatar src={me?.avatar_url} size="xs" ring="xs" shadow="sm" />
        {isOpen && (
          <Text
            size="sm"
            type="caption"
            className="animate-fade-in group-hover:text-zinc-500 dark:group-hover:text-zinc-400"
          >
            {me ? me.email : 'Guest'}
          </Text>
        )}
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        onTransitionEnd={onTransitionEnd}
        position="topRight"
      >
        {me ? (
          <LoggedInContent me={me} closeSidebar={closeSidebar} />
        ) : (
          <GuestContent closeSidebar={closeSidebar} />
        )}
      </DropDown.Content>
    </DropDown.Root>
  )
}

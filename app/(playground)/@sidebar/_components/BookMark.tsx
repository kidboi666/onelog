import useDataDrivenAnimation from '@/hooks/useStateChange'
import { IUserSession } from '@/services/queries/auth/meQuery'

interface Props {
  pathname?: string
  userId?: string
  me?: IUserSession | null
  isSelected?: boolean
}

export default function BookMark({ pathname, userId, me, isSelected }: Props) {
  const { open, close, ref, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  if ((pathname === 'profile' && userId === me?.userId) || isSelected) {
    open()
  } else {
    close()
  }
  return (
    <div
      ref={ref}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className="absolute -left-2 top-1/2 h-full w-1 -translate-y-1/2 rounded-r-md bg-var-gray transition duration-500 data-[status=closed]:scale-0"
    />
  )
}

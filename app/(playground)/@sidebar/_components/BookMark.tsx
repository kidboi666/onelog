import useDataDrivenAnimation from '@/hooks/useStateChange'
import cn from '@/lib/cn'
import { IUserSession } from '@/services/queries/auth/meQuery'
import { colorTheme, useTheme } from '@/store/useTheme'

interface Props {
  pathname?: string
  userId?: string
  me?: IUserSession | null
  isSelected?: boolean
}

export default function BookMark({ pathname, userId, me, isSelected }: Props) {
  const { color } = useTheme()
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
      className={cn(
        colorTheme({ color }),
        'absolute -left-2 top-1/2 h-full w-1 -translate-y-1/2 rounded-r-md transition duration-500 data-[status=closed]:scale-0',
      )}
    />
  )
}

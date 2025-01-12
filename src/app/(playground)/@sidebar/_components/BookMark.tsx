import cn from '@/src/lib/cn'
import { colorTheme, useTheme } from '@/src/store/useTheme'
import { IUserSession } from '@/src/types/auth'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'

interface Props {
  pathname?: string
  userId?: string
  session?: IUserSession
  isSelected?: boolean
}

export default function BookMark({
  pathname,
  userId,
  session,
  isSelected,
}: Props) {
  const { color } = useTheme()
  const { open, close, ref, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  if ((pathname === 'profile' && userId === session?.userId) || isSelected) {
    void open()
  } else {
    void close()
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

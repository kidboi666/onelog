import Avatar from '@/components/feature/user/Avatar'
import LinkButton from '@/components/shared/LinkButton'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import useStateChange from '@/hooks/useStateChange'
import cn from '@/lib/cn'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'

interface Props {
  isOpen: boolean
  pathname: string
}

const AUTH_PATHS = ['userinfo_summary', 'sentence_summary']

export default function AuthButton({ isOpen, pathname }: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { open, close, ref, onTransitionEnd } = useStateChange<HTMLDivElement>()
  if (AUTH_PATHS.includes(pathname)) {
    open()
  } else {
    close()
  }
  return (
    <List.Row className="group relative w-full">
      <div
        ref={ref}
        data-status="closed"
        onTransitionEnd={onTransitionEnd}
        className="absolute -left-2 top-1/2 h-full w-1 -translate-y-1/2 rounded-r-md bg-var-gray transition duration-500 data-[status=closed]:scale-0"
      />
      <LinkButton
        href={`/${me!.userId}`}
        variant="none"
        innerClassName="justify-start gap-4 py-1 px-1"
      >
        <Avatar src={me!.avatar_url} size="xs" ring="xs" shadow="sm" />
        <div
          className={cn(
            'origin-left transition',
            isOpen ? '' : 'scale-x-0 opacity-0',
          )}
        >
          <Text
            size="sm"
            type="caption"
            className="transition group-hover:text-zinc-500 dark:group-hover:text-zinc-400"
          >
            {me!.email}
          </Text>
        </div>
      </LinkButton>
    </List.Row>
  )
}

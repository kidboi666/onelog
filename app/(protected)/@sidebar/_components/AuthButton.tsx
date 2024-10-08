import Avatar from '@/components/feature/user/Avatar'
import LinkButton from '@/components/shared/LinkButton'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import cn from '@/lib/cn'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'

interface Props {
  isOpen: boolean
}

export default function AuthButton({ isOpen }: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  return (
    <List.Row className="group w-full">
      <LinkButton
        href={`/${me.userId}`}
        variant="none"
        innerClassName="justify-start gap-4 px-1 py-0"
      >
        <Avatar src={me?.avatar_url} size="xs" ring="xs" shadow="sm" />
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
            {me.email}
          </Text>
        </div>
      </LinkButton>
    </List.Row>
  )
}

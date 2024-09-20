'use client'

import Avatar from '@/components/feature/user/Avatar'
import Line from '@/components/shared/Line'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function AboutMe() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  if (!me) return null

  return (
    <>
      <div className="pointer-events-none flex flex-col items-center gap-4">
        <Avatar src={me.avatar_url} size="xl" ring="md" shadow="sm" />
        <div className="self-end">
          <Title className="text-2xl font-medium">{me.user_name}</Title>
        </div>
      </div>
      <div className="relative">
        <Line className="border-zinc-400 dark:border-zinc-500" />
        <Text
          as="span"
          type="caption"
          className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-zinc-400 dark:bg-var-darkgray dark:text-zinc-500"
        >
          소 개
        </Text>
      </div>
    </>
  )
}

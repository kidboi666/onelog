'use client'

import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
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
      <Box className="pointer-events-none flex flex-col items-center gap-4">
        <Avatar src={me.avatar_url} size="xl" ring="md" shadow="sm" />
        <Box className="self-end">
          <Title className="text-2xl font-medium">{me.user_name}</Title>
        </Box>
      </Box>
      <Box className="relative">
        <Line className="border-gray-400 dark:border-gray-500" />
        <Text
          as="span"
          type="caption"
          className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-400 dark:bg-var-darkgray dark:text-gray-500"
        >
          소 개
        </Text>
      </Box>
    </>
  )
}

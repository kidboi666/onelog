'use client'

import { ZStack } from '@/src/components/Stack'
import Text from '@/src/components/Text'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userQuery } from '@/src/services/queries/auth/user-query'
import { supabase } from '@/src/lib/supabase/client'

interface Props {
  userId: string
}

export default function ProfileAboutMe({ userId }: Props) {
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  return (
    <ZStack direction="col" gap={4}>
      <Text>{user.about_me ? user.about_me : '자기 소개를 작성해주세요.'}</Text>
    </ZStack>
  )
}

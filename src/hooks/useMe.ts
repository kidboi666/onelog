'use client'

import { supabase } from '@/src/lib/supabase/client'
import { IUserSession, meQuery } from '@/src/services/queries/auth/me-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { IUserInfoWithMBTI } from '@/src/types/auth'

export default function useMe(): {
  me: IUserInfoWithMBTI
  session: IUserSession | null
} {
  const { data: session } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, session?.userId),
  )

  return { me, session }
}

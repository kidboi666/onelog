'use client'

import { supabase } from '@/src/lib/supabase/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { IUserInfoWithMBTI, IUserSession } from '@/src/types/auth'
import { meQuery } from '@/src/services/queries/auth/me-query'

export default function useMeQueries(): {
  me: IUserInfoWithMBTI
  session: IUserSession
} {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, session?.userId),
  )

  return { me, session }
}

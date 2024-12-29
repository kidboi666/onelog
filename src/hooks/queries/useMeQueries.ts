'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { supabase } from '@/src/lib/supabase/client'

import { meQuery } from '@/src/services/queries/auth/me-query'

import { IUserInfoWithMBTI, IUserSession } from '@/src/types/auth'

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

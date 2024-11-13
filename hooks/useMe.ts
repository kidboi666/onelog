import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/me-query'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useMe() {
  const { data: session } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, session?.userId),
  )

  return { me, session }
}

import { getQueryClient } from '@/lib/get-query-client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import UserInfoSection from './UserInfoSection'
import { createServerClient } from '@/lib/supabase/server'

export default function LeftSection() {
  const queryClient = getQueryClient()
  const supabase = createServerClient()

  queryClient.prefetchQuery(meQuery.getUserInfo(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserInfoSection />
    </HydrationBoundary>
  )
}

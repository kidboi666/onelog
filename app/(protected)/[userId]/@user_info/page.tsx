import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { userQuery } from '@/services/queries/auth/userQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
  params: { userId: string }
}

export default function userInfo({ params }: Props) {
  const userId = params.userId
  const queryClient = getQueryClient()
  const supabase = createServerClient()

  queryClient.prefetchQuery(userQuery.getUserInfo(supabase, userId))

  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>
}

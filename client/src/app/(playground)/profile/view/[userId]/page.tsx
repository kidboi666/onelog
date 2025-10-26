import { getUserInfo } from '@/src/services/supabase/user'
import { createServerClient } from '@/src/lib/supabase/create-server-client'
import { QUERY_KEY } from '@/src/constants'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'

interface Props {
  params: { userId: string }
}

export default async function ProfilePage({ params: { userId } }: Props) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY.USER.INFO(userId),
    queryFn: () => getUserInfo(userId, supabase),
  })
  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>
}

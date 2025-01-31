import { createUserServerAdapter } from '@/src/adapters/create-server-adapter'
import { QUERY_KEY } from '@/src/constants'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'

interface Props {
  params: { userId: string }
}

export default async function ProfilePage({ params: { userId } }: Props) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY.USER.INFO(userId),
    queryFn: async () => {
      const userServerAdapter = await createUserServerAdapter()
      return userServerAdapter.getUserInfo(userId)
    },
  })
  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>
}

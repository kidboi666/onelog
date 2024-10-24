import { getQueryClient } from '@/lib/tanstack/get-query-client'
import AuthHistory from './_components/AuthHistory'
import MyFavoriteWords from './_components/MyFavoriteWords'
import { createServerClient } from '@/lib/supabase/server'
import { meQuery } from '@/services/queries/auth/meQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
  params: { userId: string }
}

export default function UserInfoSummary({ params }: Props) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  const userId = params.userId

  queryClient.prefetchQuery(meQuery.getUserInfo(supabase, userId))
  queryClient.prefetchQuery(
    sentenceQuery.getAllMySentenceCount(supabase, userId),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuthHistory />
      <MyFavoriteWords />
    </HydrationBoundary>
  )
}

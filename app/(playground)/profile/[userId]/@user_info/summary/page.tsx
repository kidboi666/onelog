import { getQueryClient } from '@/lib/tanstack/get-query-client'
import AuthHistory from './_components/AuthHistory'
import MyFavoriteWords from './_components/MyFavoriteWords'
import { createServerClient } from '@/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { countSentenceQuery } from '@/services/queries/sentence/countSentenceQuery'

interface Props {
  params: { userId: string }
}

export default function UserInfoSummary({ params }: Props) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  const userId = params.userId

  queryClient.prefetchQuery(
    countSentenceQuery.countAllMySentence(supabase, userId),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuthHistory />
      <MyFavoriteWords />
    </HydrationBoundary>
  )
}

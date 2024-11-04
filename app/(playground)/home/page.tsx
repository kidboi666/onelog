import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createServerClient } from '@/lib/supabase/server'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import PostSentenceContainer from './_containers/PostSentenceContainer'
import SentenceContainer from './_containers/SentenceContainer'
import { meQuery } from '@/services/queries/auth/meQuery'
import { YStack } from '@/components/shared/Stack'

export default function HomePage() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <YStack gap={8} className="animate-fade-in">
        <PostSentenceContainer />
        <SentenceContainer />
      </YStack>
    </HydrationBoundary>
  )
}

import { createServerClient } from '@/lib/supabase/server'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import PostSentence from '@/components/feature/sentence/sentence/PostSentence'
import Sentences from '@/components/feature/sentence/sentence/Sentences'

export default function HomePage() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()
  queryClient.prefetchQuery(sentenceQuery.getAllSentence(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostSentence />
      <Sentences />
    </HydrationBoundary>
  )
}

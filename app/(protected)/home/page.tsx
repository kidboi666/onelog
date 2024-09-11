import PostSentence from './_components/sentence/PostSentence'
import { createServerClient } from '@/lib/supabase/server'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import AllSentence from './_components/sentence/AllSentence'

export default function HomePage() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()
  queryClient.prefetchQuery(sentenceQuery.getAllSentence(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostSentence />
      <AllSentence />
    </HydrationBoundary>
  )
}

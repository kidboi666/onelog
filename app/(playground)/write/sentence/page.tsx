import { getQueryClient } from '@/lib/tanstack/get-query-client'
import PostContainer from './_containers/PostContainer'
import { createServerClient } from '@/lib/supabase/server'
import { meQuery } from '@/services/queries/auth/meQuery'
import DateLabelContainer from './_containers/DateLabelContainer'
import { YStack } from '@/components/shared/Stack'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
  params: { sentence_id: string }
}

export default function PostSentencePage({ params }: Props) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  const sentenceId = params.sentence_id

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  queryClient.prefetchQuery(
    sentenceQuery.getSentence(supabase, parseInt(sentenceId)),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <YStack gap={4} className="animate-fade-in">
        <DateLabelContainer />
        <PostContainer />
      </YStack>
    </HydrationBoundary>
  )
}

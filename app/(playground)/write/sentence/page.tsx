import { getQueryClient } from '@/lib/tanstack/get-query-client'
import PostContainer from './_container/PostContainer'
import { createServerClient } from '@/lib/supabase/server'
import { meQuery } from '@/services/queries/auth/meQuery'
import DateLabelContainer from './_container/DateLabelContainer'
import { YStack } from '@/components/shared/Stack'

export default function PostSentencePage() {
  const queryClient = getQueryClient()
  const supabase = createServerClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <YStack gap={4}>
      <DateLabelContainer />
      <PostContainer />
    </YStack>
  )
}

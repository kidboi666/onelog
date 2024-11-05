import { getQueryClient } from '@/lib/tanstack/get-query-client'
import Garden from './_components/Garden'
import PrevOneSentence from './_components/PrevOneSentence'
import { createServerClient } from '@/lib/supabase/server'
import { gardenQuery } from '@/services/queries/garden/gardenQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
  params: { userId: string }
}

export default function JournalGarden({ params }: Props) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  const userId = params.userId

  queryClient.prefetchQuery(gardenQuery.getGarden(supabase, userId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Garden />
      <PrevOneSentence />
    </HydrationBoundary>
  )
}

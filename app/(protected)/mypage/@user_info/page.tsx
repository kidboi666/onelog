import { createServerClient } from '@/lib/supabase/server'
import FavoriteWords from './_components/FavoriteWords'
import Garden from './_components/Garden'
import PrevOneSentence from './_components/PrevOneSentence'
import Summary from './_components/Summary'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { gardenQuery } from '@/services/queries/garden/gardenQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export default function UserInfoSection() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()
  queryClient.prefetchQuery(gardenQuery.getGarden(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Summary />
      <Garden />
      <FavoriteWords />
      <PrevOneSentence />
    </HydrationBoundary>
  )
}

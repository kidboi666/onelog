import { createServerClient } from '@/lib/supabase/server'
import FavoriteWords from './_components/FavoriteWords'
import Garden from './_components/Garden'
import PrevOneSentence from './_components/PrevOneSentence'
import Summary from './_components/Summary'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { gardenQuery } from '@/services/queries/garden/gardenQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { ISessionInfo } from '@/types/auth'
import Container from '@/components/shared/Container'

export default async function UserInfoSection() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  const res = queryClient.getQueryData<ISessionInfo>(['me', 'session'])

  if (!res) return
  queryClient.prefetchQuery(gardenQuery.getGarden(supabase, res?.sub))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container className="flex w-full flex-col gap-12">
        <Summary />
        <Garden />
        <FavoriteWords />
        <PrevOneSentence />
      </Container>
    </HydrationBoundary>
  )
}

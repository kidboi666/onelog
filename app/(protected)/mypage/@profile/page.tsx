import { meQuery } from '@/services/queries/auth/meQuery'
import Container from '@/components/shared/Container'
import AboutMeSection from './_components/about_me'
import NavigatorSection from './_components/navigator'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export default function ProfileSection() {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container
        isBackground
        className="mt-12 flex h-fit flex-col gap-8 rounded-md p-4 shadow-md md:p-8"
      >
        <AboutMeSection />
        <NavigatorSection />
      </Container>
    </HydrationBoundary>
  )
}

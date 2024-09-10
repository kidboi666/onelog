import Container from '@/components/shared/Container'
import HeaderLogoSection from './_components/HeaderLogoSection'
import HeaderNavSection from './_components/HeaderNavSection'
import { createServerClient } from '@/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { meQuery } from '@/services/queries/auth/meQuery'

export default function Default() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container
        as="header"
        isBlur
        className="sticky top-0 z-50 flex h-20 w-full items-center justify-between p-4 shadow-sm lg:px-12"
      >
        <HeaderLogoSection />
        <HeaderNavSection />
      </Container>
    </HydrationBoundary>
  )
}

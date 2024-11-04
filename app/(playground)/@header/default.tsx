import { createServerClient } from '@/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { meQuery } from '@/services/queries/auth/meQuery'
import ThemeToggleButton from './_components/ThemeToggleButton'
import MenuButton from './_components/MenuButton'
import { Container } from '@/components/shared/Container'
import { XStack } from '@/components/shared/Stack'

export default function Default() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container as="header" className="sticky top-0 z-50 sm:hidden">
        <Container className="w-full rounded-md bg-white/60 p-2 shadow-lg backdrop-blur-xl sm:p-4 lg:px-12 dark:bg-var-darkgray/60">
          <XStack className="h-full items-center justify-between">
            <MenuButton />
            <ThemeToggleButton isOpen viewToggle />
          </XStack>
        </Container>
      </Container>
    </HydrationBoundary>
  )
}

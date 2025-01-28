import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { createServerClient } from '@/src/lib/supabase/create-server-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { XStack } from '@/src/components/Stack'
import MenuButton from './_components/MenuButton'
import ThemeToggleButton from './_components/ThemeToggleButton'

export default function Default() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(meQuery.getSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className="sticky top-0 z-50 sm:hidden">
        <div className="w-full rounded-md bg-white/60 p-2 shadow-lg backdrop-blur-xl lg:px-12 dark:bg-var-darkgray/60">
          <XStack className="h-full items-center justify-between">
            <MenuButton />
            <ThemeToggleButton isOpen viewToggle />
          </XStack>
        </div>
      </header>
    </HydrationBoundary>
  )
}

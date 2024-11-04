import { createServerClient } from '@/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { meQuery } from '@/services/queries/auth/meQuery'
import ThemeToggleButton from './_components/ThemeToggleButton'
import MenuButton from './_components/MenuButton'

export default function Default() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className="sticky top-0 z-40 px-2 py-2 sm:hidden sm:px-4">
        <div className="flex h-12 w-full items-center justify-between rounded-md bg-white/60 p-2 shadow-lg backdrop-blur-xl sm:p-4 lg:px-12 dark:bg-var-darkgray/60">
          <MenuButton />
          <ThemeToggleButton isOpen viewToggle />
        </div>
      </header>
    </HydrationBoundary>
  )
}

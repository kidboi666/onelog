import { createServerClient } from '@/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { meQuery } from '@/services/queries/auth/meQuery'
import HeaderLogoSection from './_components/HeaderLogoSection'
import ThemeToggleButton from './_components/ThemeToggleButton'

export default function Default() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className="sticky top-0 z-40 flex h-12 w-full items-center justify-between bg-white/60 p-4 shadow-sm backdrop-blur-xl lg:px-12 dark:bg-var-darkgray/60">
        <HeaderLogoSection />
        <ThemeToggleButton />
      </header>
    </HydrationBoundary>
  )
}

import { getQueryClient } from '@/lib/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { meQuery } from '@/services/queries/auth/meQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  Header?: ReactNode
  Footer?: ReactNode
}

export default function AppLayout({
  Header,
  Footer,
  children,
}: PropsWithChildren<Props>) {
  const supabase = createServerClient()
  const queryClient = getQueryClient()
  queryClient.prefetchQuery(meQuery.getUserInfo(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {Header && Header}
      <div className="mx-auto max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
        {children}
      </div>
      {Footer && Footer}
    </HydrationBoundary>
  )
}

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
  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {Header && Header}
      <div className="flex w-full justify-center">{children}</div>
      {Footer && Footer}
    </HydrationBoundary>
  )
}

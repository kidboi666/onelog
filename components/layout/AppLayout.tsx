import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { meQuery } from '@/services/queries/auth/meQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { PropsWithChildren, ReactNode } from 'react'
import { ISessionInfo } from '@/types/auth'

interface Props {
  Header?: ReactNode
  Footer?: ReactNode
}

export default async function AppLayout({
  Header,
  Footer,
  children,
}: PropsWithChildren<Props>) {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  const res = queryClient.getQueryData<ISessionInfo>(['me', 'session'])

  if (!res) return
  queryClient.prefetchQuery(meQuery.getUserInfo(supabase, res?.sub))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {Header && Header}
      <div className="flex w-full justify-center">{children}</div>
      {Footer && Footer}
    </HydrationBoundary>
  )
}

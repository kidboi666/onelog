import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { meQuery } from '@/services/queries/auth/meQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { PropsWithChildren, ReactNode } from 'react'
import { ISessionInfo } from '@/types/auth'
import Container from '../shared/Container'

interface Props {
  Header?: ReactNode
  Footer?: ReactNode
  Background?: ReactNode
}

export default async function AppLayout({
  Header,
  Footer,
  Background,
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
      {Background && Background}
      {Header && Header}
      <Container className="flex w-full justify-center">{children}</Container>
      {Footer && Footer}
    </HydrationBoundary>
  )
}

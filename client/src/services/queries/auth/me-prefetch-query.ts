import { dehydrate } from '@tanstack/react-query'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { initClientForServer } from '@/src/utils/server-utils'

const prefetchSession = async () => {
  const { queryClient, supabase } = initClientForServer()
  await queryClient.prefetchQuery(meQuery.getSession(supabase))
  return queryClient
}

const prefetchUserInfo = async (userId: string) => {
  const { queryClient, supabase } = initClientForServer()
  await queryClient.prefetchQuery(meQuery.getUserInfo(supabase, userId))
  return queryClient
}

export const mePrefetchQuery = {
  getSession: async () => {
    const queryClient = await prefetchSession()
    return dehydrate(queryClient)
  },
  getUserInfo: async (userId: string) => {
    const queryClient = await prefetchUserInfo(userId)
    return dehydrate(queryClient)
  },
}

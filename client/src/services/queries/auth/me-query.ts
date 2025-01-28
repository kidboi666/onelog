import { createAuthAdapter } from '@/src/adapters'
import { QUERY_KEY } from '@/src/constants/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { IUserInfo, IUserSession } from '@/src/types/auth'

export const meQuery = {
  getSession: (supabase: SupabaseClient) =>
    queryOptions<IUserSession>({
      queryKey: QUERY_KEY.AUTH.SESSION,
      queryFn: () => {
        const auth = createAuthAdapter(supabase)
        return auth.getSession()
      },
      staleTime: 300000,
    }),

  getUserInfo: (supabase: SupabaseClient, userId?: string) =>
    queryOptions<IUserInfo>({
      queryKey: QUERY_KEY.AUTH.INFO,
      queryFn: async () => {
        const auth = createAuthAdapter(supabase)
        return auth.getUserInfo(userId)
      },
      enabled: !!userId,
    }),
}

import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

import { queryKey } from '@/src/lib/tanstack/query-key'

import { IUserInfoWithMBTI, IUserSession } from '@/src/types/auth'

export const meQuery = {
  getSession: (supabase: SupabaseClient) =>
    queryOptions<IUserSession>({
      queryKey: queryKey.auth.session,
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          return null
        }

        return {
          ...data.user?.user_metadata,
          userId: data.user?.id,
          provider: data.user.app_metadata.provider,
        } as IUserSession
      },
      staleTime: 300000,
    }),

  getUserInfo: (supabase: SupabaseClient, userId?: string) =>
    queryOptions<IUserInfoWithMBTI>({
      queryKey: queryKey.auth.info,
      queryFn: async () => {
        const { data } = await supabase
          .from('user_info')
          .select()
          .eq('id', userId)
          .single()

        return data
      },
      enabled: !!userId,
    }),
}

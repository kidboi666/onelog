import { createUserAdapter } from '@/src/adapters/index'
import { QUERY_KEY } from '@/src/constants/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { IUserInfo } from '@/src/types/auth'

export const userQuery = {
  getUserInfo: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Promise<IUserInfo>>({
      queryKey: QUERY_KEY.USER.INFO(userId),
      queryFn: () => createUserAdapter(supabase).getUserInfo(userId),
    }),
}

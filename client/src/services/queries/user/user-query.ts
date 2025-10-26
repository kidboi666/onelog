import { getUserInfo } from '@/src/services/supabase/user'
import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'

export const userQuery = {
  getUserInfo: (userId: string) =>
    queryOptions({
      queryKey: QUERY_KEY.USER.INFO(userId),
      queryFn: () => getUserInfo(userId),
    }),
}

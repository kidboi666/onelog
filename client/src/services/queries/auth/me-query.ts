import { authAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'
import { IUserInfo, IUserSession } from '@/src/types/entities/auth'

export const meQuery = {
  getSession: () =>
    queryOptions<IUserSession>({
      queryKey: QUERY_KEY.AUTH.SESSION,
      queryFn: () => authAdapter.getSession(),
      staleTime: 300000,
    }),

  getUserInfo: (userId: string) =>
    queryOptions<IUserInfo | null>({
      queryKey: QUERY_KEY.AUTH.INFO,
      queryFn: () => authAdapter.getUserInfo(userId),
      enabled: !!userId,
    }),
}

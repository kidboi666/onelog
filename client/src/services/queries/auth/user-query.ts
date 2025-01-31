import { userAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'
import { IUserInfo } from '@/src/types/entities/auth'

export const userQuery = {
  getUserInfo: (userId: string) =>
    queryOptions<IUserInfo>({
      queryKey: QUERY_KEY.USER.INFO(userId),
      queryFn: () => userAdapter.getUserInfo(userId),
    }),
}

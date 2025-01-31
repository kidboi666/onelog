import { FETCH_URL } from '@/src/constants/index'
import { IUserInfo } from '@/src/types/entities/auth'
import { IUserBaseAdapter } from '@/src/types/services/index'
import { fetcher } from '@/src/utils/fetcher'

export const createNestUserAdapter = (): IUserBaseAdapter => {
  const getUserInfo = async (userId: string) => {
    try {
      return await fetcher.get<IUserInfo>(FETCH_URL.USER.GET_USER_INFO(userId))
    } catch (err) {
      throw err
    }
  }
  return {
    getUserInfo,
  }
}

import { FETCH_URL } from '@/src/constants/index'
import { IUserInfo } from '@/src/types/auth'
import { IUserBaseAdapter } from '@/src/types/user'
import { fetcher } from '@/src/utils/fetcher'

export class NestUserAdapter implements IUserBaseAdapter {
  async getUserInfo(userId: string): Promise<IUserInfo> {
    try {
      return await fetcher.get<IUserInfo>(FETCH_URL.USER.GET_USER_INFO(userId))
    } catch (err) {
      throw err
    }
  }
}

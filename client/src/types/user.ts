import { IUserInfo } from '@/src/types/auth'

export interface IUserBaseAdapter {
  getUserInfo(userId: string): Promise<IUserInfo>
}

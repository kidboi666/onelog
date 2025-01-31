import { IUserInfo } from '@/src/types/entities/auth'

export interface IFollower {
  id: number
  createdAt: string
  followedUserId: string | null
  followerUserId: string | null
  userInfo: IUserInfo
}

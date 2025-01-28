import {
  ICreateFollow,
  IDeleteFollow,
  IFollowBaseAdapter,
} from '@/src/types/follow'

export class NestFollowAdapter implements IFollowBaseAdapter {
  getFollowers(userId: string): Promise<any> {
    return Promise.resolve(undefined)
  }

  getFollowings(userId: string): Promise<any> {
    return Promise.resolve(undefined)
  }

  createFollow(params: ICreateFollow): Promise<any> {
    return Promise.resolve(undefined)
  }

  deleteFollow(params: IDeleteFollow): Promise<any> {
    return Promise.resolve(undefined)
  }

  getFollowersCount(userId: string): Promise<any> {
    return Promise.resolve(undefined)
  }

  getFollowingsCount(userId: string): Promise<any> {
    return Promise.resolve(undefined)
  }
}

import { ICreateFollow, IDeleteFollow } from '@/src/types/dtos/follower'
import { IFollowBaseAdapter } from '@/src/types/services/index'

export const createNestFollowAdapter = (): IFollowBaseAdapter => {
  const getFollowers = async (userId: string): Promise<any> => {
    return Promise.resolve(undefined)
  }

  const getFollowings = async (userId: string): Promise<any> => {
    return Promise.resolve(undefined)
  }

  const createFollow = async (params: ICreateFollow): Promise<any> => {
    return Promise.resolve(undefined)
  }

  const deleteFollow = async (params: IDeleteFollow): Promise<any> => {
    return Promise.resolve(undefined)
  }

  const getFollowersCount = async (userId: string): Promise<any> => {
    return Promise.resolve(undefined)
  }

  const getFollowingsCount = async (userId: string): Promise<any> => {
    return Promise.resolve(undefined)
  }

  return {
    getFollowers,
    getFollowings,
    createFollow,
    deleteFollow,
    getFollowersCount,
    getFollowingsCount,
  }
}

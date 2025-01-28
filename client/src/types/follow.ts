import { Tables } from './supabase'

export interface IFollowBaseAdapter {
  getFollowers(userId: string): Promise<any>
  getFollowings(userId: string): Promise<any>
  getFollowersCount(userId: string): Promise<any>
  getFollowingsCount(userId: string): Promise<any>
  createFollow(params: ICreateFollow): Promise<any>
  deleteFollow(params: IDeleteFollow): Promise<any>
}

export interface TFollower extends Tables<'follow'> {
  user_info: Tables<'user_info'>
}

export interface ICreateFollow {
  followedUserId: string
  followerUserId: string
}

export interface IDeleteFollow {
  followedUserId: string
  followerUserId: string
}

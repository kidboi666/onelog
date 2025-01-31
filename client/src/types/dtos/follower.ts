export interface ICreateFollow {
  followedUserId: string
  followerUserId: string
}

export interface IDeleteFollow {
  followedUserId: string
  followerUserId: string
}

export interface ICreateFollow {
  followedUserId: string;
  followerUserId: string;
}

export interface IDeleteFollow {
  followedUserId: string;
  followerUserId: string;
}

export interface IHandleFollow {
  followedUserId: string;
  followerUserId: string;
  isFollowing: boolean;
}

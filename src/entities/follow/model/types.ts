import type { IUserInfo } from "@/entities/user/model/types";

export interface IFollower {
  id: number;
  createdAt: string;
  followedUserId: string | null;
  followerUserId: string | null;
  userInfo: IUserInfo;
}

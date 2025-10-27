import type { IUserInfo } from "@/entities/auth/model/types";

export interface IFollower {
  id: number;
  createdAt: string;
  followedUserId: string | null;
  followerUserId: string | null;
  userInfo: IUserInfo;
}

import type { AuthMethod } from "@/shared/types/enums";
import type { TMBTI } from "@/shared/types/mbti";

/**
 * Base Entity
 */
interface IBaseUserInfo {
  id: string;
  email: string;
  userName: string | null;
  aboutMe: string | null;
  avatarUrl: string | null;
  mbti: TMBTI | null;
  provider: AuthMethod;
  createdAt: string;
  updatedAt: string;
}

export interface IUserInfo extends IBaseUserInfo {
  favoriteWords: string[] | null;
}

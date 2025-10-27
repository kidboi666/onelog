import type { AuthMethod } from "@/shared/types/enums";

interface IBaseUserSession {
  id: string;
  provider: AuthMethod;
}

export interface IUserSession extends IBaseUserSession {
  sub: string;
}

export interface IUploadAvatar {
  email: string;
  image: File | null;
}

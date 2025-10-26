import { AuthMethod } from '@/src/types/enums/index'
import { TMBTI } from '@/src/app/(playground)/profile/edit/_constants/mbti'

/**
 * Base Entity
 */
interface IBaseUserInfo {
  id: string
  email: string
  userName: string | null
  aboutMe: string | null
  avatarUrl: string | null
  mbti: TMBTI | null
  provider: AuthMethod
  createdAt: string
  updatedAt: string
}

interface IBaseUserSession {
  id: string
  provider: AuthMethod
}

/**
 * Supabase Entity
 */
export interface ISupabaseUserSession extends IBaseUserSession {
  sub: string
}

export interface ISupabaseUserInfo extends IBaseUserInfo {
  favoriteWords: string[] | null
}

export interface IUploadAvatar {
  email: string
  image: File | null
}

/**
 * Nest Entity
 */
export interface INestUserSession extends IBaseUserSession {
  refreshToken: string
  refreshTokenExp: string
}

export interface INestUserInfo extends IBaseUserInfo {
  stats: {
    followerCount: number
    followingCount: number
    postCount: number
  }
}

/**
 * Adapter Type - Now using only Supabase after refactoring
 */
export type IUserSession = ISupabaseUserSession
export type IUserInfo = ISupabaseUserInfo

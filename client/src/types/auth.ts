import { AxiosResponse } from 'axios'
import { AuthProvider } from '@/src/types/enums/index'
import { TMBTI } from '@/src/app/(playground)/profile/edit/_constants/mbti'

/**
 * Class Interface
 */
export interface IAuthBaseAdapter {
  signIn(params: ISignIn): Promise<any>
  signUp(params: ISignUp): Promise<any>
  signOut(): Promise<void>
  getSession(): Promise<IUserSession | null>
  getUserInfo(userId?: string): Promise<IUserInfo | null>
  updateUserInfo(params: IUpdateUserInfo): Promise<void>
  uploadAvatarImage(params: IUploadAvatar): Promise<string>
  deleteAvatarImage(imageUrl: string): Promise<void>
}

/**
 * DTO
 */
export interface ISignIn {
  email: string
  password: string
}

export interface ISignUp {
  email: string
  password: string
  userName: string
}

export interface IUpdateUserInfo {
  aboutMe?: string | null
  userName?: string | null
  avatarUrl?: string | null
  mbti?: TMBTI
}

export interface IUpdateProfileFormStates {
  userName: string | null
  aboutMe: string | null
  avatarUrl: string | null
  imageFile: File | null
  prevAvatarUrl: string | null
  mbti: TMBTI | null
}

export interface ISignInRequest {
  email: string
  password: string
}

export interface ISignInResponse extends AxiosResponse {
  accessToken: string
  refreshToken: string
}

export interface ISignUpRequest extends ISignInRequest {}

export interface ISignUpResponse extends ISignInResponse {}

/**
 * Supabase
 */
export interface ISupabaseUserSession {
  sub: string
  id: string
  provider: string
}

export interface ISupabaseUserInfo {
  aboutMe: string | null
  avatarUrl: string | null
  createdAt: string
  email: string
  favoriteWords: string[] | null
  id: string
  provider: AuthProvider
  mbti: TMBTI | null
  userName: string | null
}

export interface IUploadAvatar {
  email: string
  image: File | null
}

/**
 * Nest
 */
export interface INestUserInfo {
  id: string
  email: string
  avatarUrl: string | null
  userName: string | null
  aboutMe: string | null
  mbti: TMBTI | null
  provider: AuthProvider
  createdAt: string
  updatedAt: string
  stats: {
    followerCount: number
    followingCount: number
    postCount: number
  }
}

export interface INestUserSession {
  id: string
  provider: string
  refreshToken: string
  refreshTokenExp: string
}

/**
 * Adapter
 */
export type IUserSession = ISupabaseUserSession | INestUserSession | null

export type IUserInfo = ISupabaseUserInfo | INestUserInfo | null

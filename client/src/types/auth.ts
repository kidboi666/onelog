import { AxiosResponse } from 'axios'
import { Tables } from '@/src/types/supabase'
import { TMBTI } from '@/src/app/(playground)/profile/edit/_constants/mbti'

export interface IAuthBaseAdapter {
  signIn(data: ISignIn): Promise<any>
  signUp(data: ISignUp): Promise<any>
  signOut(): Promise<void>
  getSession(): Promise<IUserSession | null>
  getUserInfo(userId?: string): Promise<IUserInfo | null>
}

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

export interface ISupabaseUserSession {
  about_me: string
  avatar_url: string | null
  email: string
  email_verified: boolean
  user_name: string
  phone_verified: boolean
  sub: string
  userId: string
  provider: string
}

export interface INestUserInfo {
  id: string
  email: string
  avatarUrl: string | null
  userName: string | null
  aboutMe: string | null
  mbti: string | null
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
  refreshToken: string
  refreshTokenExp: string
}

export type IUserSession = ISupabaseUserSession | INestUserSession | null

export type IUserInfo = Tables<'user_info'> | INestUserInfo | null

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

interface UpdateUserRequest {
  avatarUrl: string
  userName: string
  aboutMe: string
  mbti: string
}

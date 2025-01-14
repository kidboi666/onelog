import { TMBTI } from '@/src/app/(playground)/profile/edit/_constants/mbti'

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

interface IUser {
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

export type IUserSession = IUser | null

export interface ISignIn {
  email: string
  password: string
}

export interface ISignUp {
  email: string
  password: string
  nickname: string
}

export interface IUpdateUserInfo {
  userId: string
  aboutMe: string | null
  nickname: string | null
  avatarUrl?: string | null
}

export interface ISessionInfo {
  about_me: string
  avatar_url: string | null
  email: string
  email_verified: boolean
  nickname: string
  phone_verified: boolean
  sub: string
}

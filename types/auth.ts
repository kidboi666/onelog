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
  userId: string
  aboutMe: string | null
  userName: string | null
  avatarUrl?: string | null
}

export interface ISessionInfo {
  about_me: string
  avatar_url: string | null
  email: string
  email_verified: boolean
  user_name: string
  phone_verified: boolean
  sub: string
  userId: string
}

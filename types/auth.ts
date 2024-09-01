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

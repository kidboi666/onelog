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

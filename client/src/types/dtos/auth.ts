import { AxiosResponse } from 'axios'
import { ChangeEvent } from 'react'
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

export interface IUpdateProfileFormStates {
  userName: string | null
  aboutMe: string | null
  avatarPreview: string | null
  imageFile: File | null
  currentAvatarUrl: string | null
  mbti: TMBTI | null
}

export interface IUpdateProfileFormActions {
  onChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeAboutMe: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onChangeAvatarPreview: (avatarUrl: string) => void
  onChangeImageFile: (imageFile: File | null) => void
  onChangeCurrentAvatarUrl: (prevAvatarUrl: string) => void
  onChangeMbti: (mbti: TMBTI) => void
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

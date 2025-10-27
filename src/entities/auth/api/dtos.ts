import type { AxiosResponse } from "axios";
import type { ChangeEvent } from "react";
import type { TMBTI } from "@/shared/types/mbti";

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
  userName: string;
}

export interface IUpdateUserInfo {
  userId: string;
  aboutMe?: string | null;
  userName?: string | null;
  avatarUrl?: string | null;
  mbti?: TMBTI;
}

export interface IUpdateProfileFormStates {
  userName: string | null;
  aboutMe: string | null;
  avatarPreview: string | null;
  imageFile: File | null;
  currentAvatarUrl: string | null;
  mbti: TMBTI | null;
}

export interface IUpdateProfileFormActions {
  onChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAboutMe: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeAvatarPreview: (avatarUrl: string) => void;
  onChangeImageFile: (imageFile: File | null) => void;
  onChangeCurrentAvatarUrl: (prevAvatarUrl: string) => void;
  onChangeMbti: (mbti: TMBTI) => void;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignInResponse extends AxiosResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ISignUpRequest extends ISignInRequest {}

export interface ISignUpResponse extends ISignInResponse {}

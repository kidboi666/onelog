import type { SupabaseClient } from "@supabase/supabase-js";
import * as authApi from "@/entities/auth/api/auth-api";
import type {
  ISignIn,
  ISignUp,
  IUpdateUserInfo,
} from "@/entities/auth/api/dtos";
import type { IUploadAvatar } from "@/entities/auth/model/types";

/**
 * 로그아웃 (localStorage 정리 포함)
 */
export const signOutWithCleanup = async (supabase?: SupabaseClient) => {
  await authApi.signOut(supabase);

  // 클라이언트 사이드에서만 localStorage 정리
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-storage");
  }
};

/**
 * 로그인
 */
export const signIn = (authData: ISignIn, supabase?: SupabaseClient) => {
  return authApi.signIn(authData, supabase);
};

/**
 * 회원가입
 */
export const signUp = (authData: ISignUp, supabase?: SupabaseClient) => {
  return authApi.signUp(authData, supabase);
};

/**
 * 유저 정보 수정
 */
export const updateUserInfo = (
  params: IUpdateUserInfo,
  supabase?: SupabaseClient,
) => {
  return authApi.updateUserInfo(params, supabase);
};

/**
 * 프로필 이미지 업로드
 */
export const uploadAvatarImage = (
  params: IUploadAvatar,
  supabase?: SupabaseClient,
) => {
  return authApi.uploadAvatarImage(params, supabase);
};

/**
 * 프로필 이미지 삭제
 */
export const deleteAvatarImage = (
  imageUrl: string,
  supabase?: SupabaseClient,
) => {
  return authApi.deleteAvatarImage(imageUrl, supabase);
};

export const getCurrentUser = async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return user;
};

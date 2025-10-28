import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ISignIn,
  ISignUp,
  IUpdateUserInfo,
} from "@/entities/auth/api/dtos";
import type { IUploadAvatar } from "@/entities/auth/model/types";
import type { IUserInfo } from "@/entities/user/model/types";
import { createBrowserClient } from "@/shared/lib/supabase/create-browser-client";
import {
  handleAuthError,
  handleStorageError,
  processImageUrlPath,
  processQuery,
} from "@/shared/lib/supabase/helpers";

// 로그인
export const signIn = async (
  authData: ISignIn,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<IUserInfo | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: authData.email,
    password: authData.password,
  });
  handleAuthError(error);
  if (data?.user?.id) {
    const query = supabase
      .from("user_info")
      .select()
      .eq("id", data.user.id)
      .single();

    return processQuery<IUserInfo>(query);
  }
  return null;
};

// 회원가입
export const signUp = async (
  authData: ISignUp,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { data, error } = await supabase.auth.signUp({
    email: authData.email,
    password: authData.password,
    options: {
      data: {
        user_name: authData.userName,
        avatar_url: "",
        about_me: "",
        mbti: "",
      },
    },
  });
  handleAuthError(error);
  if (data?.user?.id) {
    const query = supabase
      .from("user_info")
      .select()
      .eq("id", data.user.id)
      .single();

    return processQuery(query);
  }
};

// 로그아웃
export const signOut = async (
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase.auth.signOut();
  handleAuthError(error);
};

// 유저 정보 수정하기
export const updateUserInfo = async (
  params: IUpdateUserInfo,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<IUserInfo | null> => {
  const query = supabase
    .from("user_info")
    .update({
      about_me: params.aboutMe,
      avatar_url: params.avatarUrl,
      user_name: params.userName,
    })
    .eq("id", params.userId)
    .select()
    .single();
  return processQuery<IUserInfo>(query);
};

// 유저 프로필 이미지 업로드하기
export const uploadAvatarImage = async (
  params: IUploadAvatar,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { data, error } = await supabase.storage
    .from("profile_image")
    .upload(`${params.email}/${new Date().getTime()}`, params.image!);

  handleStorageError(error);
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL!;
  return `${baseUrl}/${data?.fullPath}`;
};

// 유저 프로필 이미지 지우기
export const deleteAvatarImage = async (
  imageUrl: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const imageUrlPath = processImageUrlPath(imageUrl);
  const { error } = await supabase.storage
    .from("profile_image")
    .remove([imageUrlPath]);

  handleStorageError(error);
};

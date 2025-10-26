import { processQuery } from '@/src/services/supabase/helpers'
import { APIError } from '@/src/error'
import { AuthError } from '@supabase/auth-js'
import { StorageError } from '@supabase/storage-js'
import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'
import { ISignIn, ISignUp, IUpdateUserInfo } from '@/src/types/dtos/auth'
import { IUploadAvatar, IUserInfo } from '@/src/types/entities/auth'

// 로그인
export const signIn = async (
  authData: ISignIn,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<IUserInfo | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: authData.email,
    password: authData.password,
  })
  handleAuthError(error)
  if (data?.user?.id) {
    const query = supabase
      .from('user_info')
      .select()
      .eq('id', data.user.id)
      .single()

    return processQuery<IUserInfo>(query)
  }
  return null
}

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
        avatar_url: '',
        about_me: '',
        mbti: '',
      },
    },
  })
  handleAuthError(error)
  if (data?.user?.id) {
    const query = supabase
      .from('user_info')
      .select()
      .eq('id', data.user.id)
      .single()

    return processQuery(query)
  }
}

// 로그아웃
export const signOut = async (
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase.auth.signOut()
  handleAuthError(error)
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-storage')
  }
}

// 유저 정보 수정하기
export const updateUserInfo = async (
  params: IUpdateUserInfo,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<IUserInfo | null> => {
  const query = supabase
    .from('user_info')
    .update({
      about_me: params.aboutMe,
      avatar_url: params.avatarUrl,
      user_name: params.userName,
    })
    .eq('id', params.userId)
    .select()
    .single()
  return processQuery<IUserInfo>(query)
}

// 유저 프로필 이미지 업로드하기
export const uploadAvatarImage = async (
  params: IUploadAvatar,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { data, error } = await supabase.storage
    .from('profile_image')
    .upload(`${params.email}/${new Date().getTime()}`, params.image!)

  handleStorageError(error)
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL!
  console.log(`${baseUrl}/${data?.fullPath}`)
  return `${baseUrl}/${data?.fullPath}`
}

// 유저 프로필 이미지 지우기
export const deleteAvatarImage = async (
  imageUrl: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const imageUrlPath = processImageUrlPath(imageUrl)
  const { error } = await supabase.storage
    .from('profile_image')
    .remove([imageUrlPath])

  handleStorageError(error)
}

// 스토리지 예외 처리
const handleStorageError = (error: StorageError | null) => {
  if (error?.message) {
    throw new APIError(500, error.message, error)
  }
}

// auth 예외 처리
const handleAuthError = (error: AuthError | null) => {
  if (error?.status && error?.code) {
    console.error(error)
    throw new APIError(error.status, error.code, error)
  }
}

// 이미지 파일 주소화 처리 헬퍼 함수
const processImageUrlPath = (imageUrl: string): string => {
  const splitPath = imageUrl.split('/')
  const email = splitPath[splitPath.length - 2]
  const fileName = splitPath[splitPath.length - 1]
  return `${email}/${fileName}`
}

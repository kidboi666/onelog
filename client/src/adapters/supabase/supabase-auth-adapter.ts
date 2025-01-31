import { processQuery } from '@/src/adapters/query-helpers'
import { APIError } from '@/src/error/index'
import { AuthError } from '@supabase/auth-js'
import { StorageError } from '@supabase/storage-js'
import { SupabaseClient } from '@supabase/supabase-js'
import { ISignIn, ISignUp, IUpdateUserInfo } from '@/src/types/dtos/auth'
import { IUploadAvatar, IUserInfo } from '@/src/types/entities/auth'
import { IAuthBaseAdapter } from '@/src/types/services/index'

export const createSupabaseAuthAdapter = (
  supabase: SupabaseClient,
): IAuthBaseAdapter => {
  // 로그인
  const signIn = async (authData: ISignIn) => {
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

      return processQuery(query)
    }
  }

  // 회원가입
  const signUp = async (authData: ISignUp) => {
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
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    handleAuthError(error)
    localStorage.removeItem('auth-storage')
  }

  // 유저 정보 수정하기
  const updateUserInfo = async (params: IUpdateUserInfo) => {
    const query = supabase
      .from('user_info')
      .update({
        about_me: params.aboutMe,
        avatar_url: params.avatarUrl,
        user_name: params.userName,
      })
      .eq('id', params.userId)
      .single()
    return processQuery<IUserInfo>(query)
  }

  // 유저 프로필 이미지 업로드하기
  const uploadAvatarImage = async (params: IUploadAvatar) => {
    const { data, error } = await supabase.storage
      .from('profile_image')
      .upload(`${params.email}/${new Date().getTime()}`, params.image!)

    handleStorageError(error)
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL!
    console.log(`${baseUrl}/${data?.fullPath}`)
    return `${baseUrl}/${data?.fullPath}`
  }

  // 유저 프로필 이미지 지우기
  const deleteAvatarImage = async (imageUrl: string) => {
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

  return {
    signIn,
    signUp,
    signOut,
    updateUserInfo,
    uploadAvatarImage,
    deleteAvatarImage,
  }
}

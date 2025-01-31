import { handleError, transformResponse } from '@/src/adapters/query-helpers'
import { APIError } from '@/src/error/index'
import { AuthError } from '@supabase/auth-js'
import { StorageError } from '@supabase/storage-js'
import { SupabaseClient } from '@supabase/supabase-js'
import { ISignIn, ISignUp, IUpdateUserInfo } from '@/src/types/dtos/auth'
import {
  IUploadAvatar,
  IUserInfo,
  IUserSession,
} from '@/src/types/entities/auth'
import { IAuthBaseAdapter } from '@/src/types/services/index'

export const createSupabaseAuthAdapter = (
  supabase: SupabaseClient,
): IAuthBaseAdapter => {
  const handleStorageError = (error: StorageError | null) => {
    if (error?.message) {
      throw new APIError(500, error.message, error)
    }
  }

  const handleAuthError = (error: AuthError | null) => {
    if (error?.status && error?.code) {
      throw new APIError(error.status, error.code, error)
    }
  }

  const processImageUrlPath = (imageUrl: string): string => {
    const splitPath = imageUrl.split('/')
    const email = splitPath[splitPath.length - 2]
    const fileName = splitPath[splitPath.length - 1]
    return `${email}/${fileName}`
  }

  const signIn = async (authData: ISignIn): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: authData.email,
      password: authData.password,
    })
    handleAuthError(error)
  }

  const signUp = async (authData: ISignUp): Promise<void> => {
    const { error } = await supabase.auth.signUp({
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
  }

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut()
    handleAuthError(error)
  }

  const getSession = async (): Promise<IUserSession> => {
    const { data, error } = await supabase.auth.getUser()
    if (!data.user) {
      return null
    }
    handleAuthError(error)

    return transformResponse({
      ...data.user?.user_metadata,
      id: data.user?.id,
      provider: data.user?.app_metadata.provider,
    } as IUserSession)
  }

  const getUserInfo = async (userId: string): Promise<IUserInfo | null> => {
    const { data, error } = await supabase
      .from('user_info')
      .select()
      .eq('id', userId)
      .single()

    if (!data?.id) {
      return null
    }

    handleError(error)
    return transformResponse(data)
  }

  const updateUserInfo = async (params: IUpdateUserInfo): Promise<void> => {
    const { error } = await supabase.auth.updateUser({
      data: {
        about_me: params.aboutMe,
        avatar_url: params.avatarUrl,
        user_name: params.userName,
      },
    })
    handleAuthError(error)
  }

  const uploadAvatarImage = async (params: IUploadAvatar): Promise<string> => {
    const { data, error } = await supabase.storage
      .from('profile_image')
      .upload(`${params.email}/${new Date().getTime()}`, params.image!)

    handleStorageError(error)
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL!
    return `${baseUrl}/${data?.fullPath}`
  }

  const deleteAvatarImage = async (imageUrl: string): Promise<void> => {
    const imageUrlPath = processImageUrlPath(imageUrl)
    const { error } = await supabase.storage
      .from('profile_image')
      .remove([imageUrlPath])

    handleStorageError(error)
  }

  return {
    signIn,
    signUp,
    signOut,
    getSession,
    getUserInfo,
    updateUserInfo,
    uploadAvatarImage,
    deleteAvatarImage,
  }
}

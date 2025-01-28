import { QueryHelpers } from '@/src/adapters/query-helpers'
import { AuthError } from '@supabase/auth-js'
import { StorageError } from '@supabase/storage-js'
import { SupabaseClient } from '@supabase/supabase-js'
import {
  IAuthBaseAdapter,
  ISignIn,
  ISignUp,
  IUpdateUserInfo,
  IUploadAvatar,
  IUserInfo,
  IUserSession,
} from '@/src/types/auth'
import { APIError } from '@/src/utils/fetcher'

export class SupabaseAuthAdapter
  extends QueryHelpers
  implements IAuthBaseAdapter
{
  constructor(private readonly supabase: SupabaseClient) {
    super()
  }

  async signIn(authData: ISignIn): Promise<void> {
    const { error } = await this.supabase.auth.signInWithPassword({
      email: authData.email,
      password: authData.password,
    })
    this.handleAuthError(error)
  }

  async signUp(authData: ISignUp): Promise<void> {
    const { error } = await this.supabase.auth.signUp({
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
    this.handleAuthError(error)
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut()
    this.handleAuthError(error)
  }

  async getSession(): Promise<IUserSession> {
    const { data, error } = await this.supabase.auth.getUser()
    if (!data.user) {
      return null
    }
    this.handleAuthError(error)
    return this.transformResponse({
      ...data.user?.user_metadata,
      id: data.user?.id,
      provider: data.user?.app_metadata.provider,
    } as IUserSession)
  }

  async getUserInfo(userId: string): Promise<IUserInfo> {
    const { data, error } = await this.supabase
      .from('user_info')
      .select()
      .eq('id', userId)
      .single()

    if (!data.id) {
      return null
    }

    this.handleError(error)
    return this.transformResponse(data)
  }

  async updateUserInfo(params: IUpdateUserInfo): Promise<void> {
    const { error } = await this.supabase.auth.updateUser({
      data: {
        about_me: params.aboutMe,
        avatar_url: params.avatarUrl,
        user_name: params.userName,
      },
    })

    this.handleAuthError(error)
  }

  async uploadAvatarImage(params: IUploadAvatar): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from('profile_image')
      .upload(`${params.email}/${new Date().getTime()}`, params.image!)

    this.handleStorageError(error)
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL!
    return `${baseUrl}/${data?.fullPath}`
  }

  async deleteAvatarImage(imageUrl: string): Promise<void> {
    const imageUrlPath = this.processImageUrlPath(imageUrl)
    const { error } = await this.supabase.storage
      .from('profile_image')
      .remove([imageUrlPath])

    this.handleStorageError(error)
  }

  private handleStorageError(error: StorageError | null) {
    if (error?.message) {
      throw new APIError(500, error.message, error)
    }
  }

  private handleAuthError(error: AuthError | null) {
    if (error?.status && error?.code) {
      throw new APIError(error.status, error.code, error)
    }
  }

  private processImageUrlPath(imageUrl: string): string {
    const splitPath = imageUrl.split('/')
    const email = splitPath[splitPath.length - 2]
    const fileName = splitPath[splitPath.length - 1]

    return `${email}/${fileName}`
  }
}

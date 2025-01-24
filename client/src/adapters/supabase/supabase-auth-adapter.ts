import { AuthError } from '@supabase/auth-js'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { AxiosError } from 'axios'
import {
  IAuthBaseAdapter,
  ISignIn,
  ISignUp,
  IUserInfo,
  IUserSession,
} from '@/src/types/auth'
import { APIError } from '@/src/utils/fetcher'

export class SupabaseAuthAdapter implements IAuthBaseAdapter {
  constructor(private readonly supabase: SupabaseClient) {}

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
    this.handleAuthError(error)
    if (!data.user) {
      throw new APIError(
        401,
        'USER_NOT_FOUND',
        new AxiosError('Session not found'),
      )
    }
    return {
      ...data.user?.user_metadata,
      userId: data.user?.id,
      provider: data.user?.app_metadata.provider,
    } as IUserSession
  }

  async getUserInfo(userId: string): Promise<IUserInfo> {
    const { data, error } = await this.supabase
      .from('user_info')
      .select()
      .eq('id', userId)
      .single()
    this.handlePostgrestError(error as PostgrestError)
    return data
  }

  private handleAuthError(error: AuthError | null) {
    if (error?.status && error?.code) {
      throw new APIError(error.status, error.code, error)
    }
  }

  private handlePostgrestError(error: PostgrestError | null) {
    if (error?.code && error?.message) {
      throw new APIError(error.code, error.message, error)
    }
  }
}

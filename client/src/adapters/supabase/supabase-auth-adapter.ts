import { SupabaseHelpers } from '@/src/adapters/supabase/supabase-helpers'
import { AuthError } from '@supabase/auth-js'
import { SupabaseClient } from '@supabase/supabase-js'
import {
  IAuthBaseAdapter,
  ISignIn,
  ISignUp,
  IUserInfo,
  IUserSession,
} from '@/src/types/auth'
import { APIError } from '@/src/utils/fetcher'

export class SupabaseAuthAdapter
  extends SupabaseHelpers
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

  private handleAuthError(error: AuthError | null) {
    if (error?.status && error?.code) {
      throw new APIError(error.status, error.code, error)
    }
  }
}

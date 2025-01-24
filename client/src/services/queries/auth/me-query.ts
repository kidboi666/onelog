import { AuthError } from '@supabase/auth-js'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import {
  IAuthBaseAdapter,
  ISignIn,
  ISignUp,
  IUserInfo,
  IUserSession,
} from '@/src/types/auth'
import { createAuthAdapter } from '@/src/utils/adapter'
import { APIError } from '@/src/utils/fetcher'

export const meQuery = {
  getSession: (supabase: SupabaseClient) =>
    queryOptions<IUserSession>({
      queryKey: QUERY_KEY.AUTH.SESSION,
      queryFn: () => {
        const auth = createAuthAdapter(supabase)
        return auth.getSession()
      },
      staleTime: 300000,
    }),

  getUserInfo: (supabase: SupabaseClient, userId?: string) =>
    queryOptions<IUserInfo>({
      queryKey: QUERY_KEY.AUTH.INFO,
      queryFn: async () => {
        const auth = createAuthAdapter(supabase)
        return auth.getUserInfo(userId)
      },
      enabled: !!userId,
    }),
}

export class SupabaseAuthAdapter implements IAuthBaseAdapter {
  constructor(private readonly supabase: SupabaseClient) {}
  async signIn(authData: ISignIn): Promise<void> {
    const { error } = await this.supabase.auth.signInWithPassword({
      email: authData.email,
      password: authData.password,
    })

    if (error instanceof AuthError) {
      throw new APIError(error.status!, error.code!, error)
    }
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

    if (error instanceof AuthError) {
      throw new APIError(error.status!, error.code!, error!)
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut()

    if (error instanceof AuthError) {
      throw new APIError(error.status!, error.code!, error)
    }
  }

  async getSession(): Promise<IUserSession> {
    const { data, error } = await this.supabase.auth.getUser()

    if (error instanceof AuthError) {
      if (error.status && error.code) {
        throw new APIError(error.status, error.code, error)
      }
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

    if (error) {
      throw new APIError(error.code, error.message, error)
    }

    return data
  }
}

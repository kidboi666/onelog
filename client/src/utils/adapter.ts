import { NestAuthAdapter } from '@/src/api/auth-api'
import { NestPostAdapter } from '@/src/api/post-api'
import { SupabaseClient } from '@supabase/supabase-js'
import { SupabaseAuthAdapter } from '@/src/services/queries/auth/me-query'
import { SupabasePostAdapter } from '@/src/services/queries/post/post-query'
import { IAuthBaseAdapter } from '@/src/types/auth'
import { IPostBaseAdapter } from '@/src/types/post'

export enum Provider {
  SUPABASE = 'supabase',
  NEST = 'nest',
}

const databaseProvider =
  (process.env.NEXT_PUBLIC_DB_PROVIDER as Provider) ?? Provider.SUPABASE

const createAdapter = <T>(
  provider: Provider,
  client: SupabaseClient | undefined,
  supabaseCallback: (client: SupabaseClient) => T,
  nestCallback: () => T,
): T => {
  if (provider === Provider.SUPABASE && client) {
    return supabaseCallback(client)
  }
  return nestCallback()
}

export function createAuthAdapter(
  supabaseClient?: SupabaseClient,
): IAuthBaseAdapter {
  return createAdapter<IAuthBaseAdapter>(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseAuthAdapter(client),
    () => new NestAuthAdapter(),
  )
}

export function createPostAdapter(
  supabaseClient?: SupabaseClient,
): IPostBaseAdapter {
  return createAdapter<IPostBaseAdapter>(
    databaseProvider,
    supabaseClient,
    (client) => new SupabasePostAdapter(client),
    () => new NestPostAdapter(),
  )
}

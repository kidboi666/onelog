import { NestAuthAdapter } from '@/src/adapters/nest/nest-auth-adapter'
import { NestEmotionAdapter } from '@/src/adapters/nest/nest-emotion-adapter'
import { NestFollowAdapter } from '@/src/adapters/nest/nest-follow-adapter'
import { NestGardenAdapter } from '@/src/adapters/nest/nest-garden-adapter'
import { NestPostAdapter } from '@/src/adapters/nest/nest-post-adapter'
import { NestTodoAdapter } from '@/src/adapters/nest/nest-todo-adapter'
import { NestWordAdapter } from '@/src/adapters/nest/nest-word-adapter'
import { SupabaseAuthAdapter } from '@/src/adapters/supabase/supabase-auth-adapter'
import { SupabaseEmotionAdapter } from '@/src/adapters/supabase/supabase-emotion-adapter'
import { SupabaseFollowAdapter } from '@/src/adapters/supabase/supabase-follow-adapter'
import { SupabaseGardenAdapter } from '@/src/adapters/supabase/supabase-garden-adapter'
import { SupabasePostAdapter } from '@/src/adapters/supabase/supabase-post-adapter'
import { SupabaseTodoAdapter } from '@/src/adapters/supabase/supabase-todo-adapter'
import { SupabaseUserAdapter } from '@/src/adapters/supabase/supabase-user-adapter'
import { SupabaseWordAdapter } from '@/src/adapters/supabase/supabase-word-adapter'
import { SupabaseClient } from '@supabase/supabase-js'
import { IAuthBaseAdapter } from '@/src/types/auth'
import { Provider } from '@/src/types/enums'
import { IFollowBaseAdapter } from '@/src/types/follow'
import { IGardenBaseAdapter } from '@/src/types/garden'
import { IPostBaseAdapter } from '@/src/types/post'
import { ITodoBaseAdapter } from '@/src/types/todo'
import { IWordBaseAdapter } from '@/src/types/word'
import { NestUserAdapter } from './nest/nest-user-adapter'

export const databaseProvider =
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

export function createWordAdapter(
  supabaseClient?: SupabaseClient,
): IWordBaseAdapter {
  return createAdapter<IWordBaseAdapter>(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseWordAdapter(client),
    () => new NestWordAdapter(),
  )
}

export function createTodoAdapter(
  supabaseClient?: SupabaseClient,
): ITodoBaseAdapter {
  return createAdapter(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseTodoAdapter(client),
    () => new NestTodoAdapter(),
  )
}

export function createGardenAdapter(
  supabaseClient?: SupabaseClient,
): IGardenBaseAdapter {
  return createAdapter(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseGardenAdapter(client),
    () => new NestGardenAdapter(),
  )
}

export function createFollowAdapter(
  supabaseClient?: SupabaseClient,
): IFollowBaseAdapter {
  return createAdapter(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseFollowAdapter(client),
    () => new NestFollowAdapter(),
  )
}

export function createUserAdapter(supabaseClient?: SupabaseClient) {
  return createAdapter(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseUserAdapter(client),
    () => new NestUserAdapter(),
  )
}

export function createEmotionAdapter(supabaseClient?: SupabaseClient) {
  return createAdapter(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseEmotionAdapter(client),
    () => new NestEmotionAdapter(),
  )
}

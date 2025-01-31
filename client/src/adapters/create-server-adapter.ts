import { createNestAuthAdapter } from '@/src/adapters/nest/nest-auth-adapter'
import { createNestCommentAdapter } from '@/src/adapters/nest/nest-comment-adapter'
import { createNestEmotionAdapter } from '@/src/adapters/nest/nest-emotion-adapter'
import { createNestFollowAdapter } from '@/src/adapters/nest/nest-follow-adapter'
import { createNestGardenAdapter } from '@/src/adapters/nest/nest-garden-adapter'
import { createNestLikeAdapter } from '@/src/adapters/nest/nest-like-adapter'
import { createNestPostAdapter } from '@/src/adapters/nest/nest-post-adapter'
import { createNestReportAdapter } from '@/src/adapters/nest/nest-report-adapter'
import { createNestTodoAdapter } from '@/src/adapters/nest/nest-todo-adapter'
import { createNestUserAdapter } from '@/src/adapters/nest/nest-user-adapter'
import { createNestWordAdapter } from '@/src/adapters/nest/nest-word-adapter'
import { createSupabaseAuthAdapter } from '@/src/adapters/supabase/supabase-auth-adapter'
import { createSupabaseCommentAdapter } from '@/src/adapters/supabase/supabase-comment-adapter'
import { createSupabaseEmotionAdapter } from '@/src/adapters/supabase/supabase-emotion-adapter'
import { createSupabaseFollowAdapter } from '@/src/adapters/supabase/supabase-follow-adapter'
import { createSupabaseGardenAdapter } from '@/src/adapters/supabase/supabase-garden-adapter'
import { createSupabaseLikeAdapter } from '@/src/adapters/supabase/supabase-like-adapter'
import { createSupabasePostAdapter } from '@/src/adapters/supabase/supabase-post-adapter'
import { createSupabaseReportAdapter } from '@/src/adapters/supabase/supabase-report-adatper'
import { createSupabaseTodoAdapter } from '@/src/adapters/supabase/supabase-todo-adapter'
import { createSupabaseUserAdapter } from '@/src/adapters/supabase/supabase-user-adapter'
import { createSupabaseWordAdapter } from '@/src/adapters/supabase/supabase-word-adapter'
import { SupabaseClient } from '@supabase/supabase-js'
import { createServerClient } from '@/src/lib/supabase/create-server-client'
import { Provider } from '@/src/types/enums/index'

type AdapterFactory<T> = {
  supabase: (client: SupabaseClient) => T
  nest: () => T
}

export const createServerAdapter = async () => {
  const databaseProvider =
    (process.env.NEXT_PUBLIC_DB_PROVIDER as Provider) ?? Provider.SUPABASE
  const supabaseClient = createServerClient()

  return <T>(factory: AdapterFactory<T>): T => {
    return databaseProvider === Provider.SUPABASE
      ? factory.supabase(supabaseClient)
      : factory.nest()
  }
}

export const createAuthServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseAuthAdapter(client),
    nest: () => createNestAuthAdapter(),
  })
}

export const createUserServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseUserAdapter(client),
    nest: () => createNestUserAdapter(),
  })
}

export const createEmotionServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseEmotionAdapter(client),
    nest: () => createNestEmotionAdapter(),
  })
}

export const createFollowServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseFollowAdapter(client),
    nest: () => createNestFollowAdapter(),
  })
}

export const createGardenServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseGardenAdapter(client),
    nest: () => createNestGardenAdapter(),
  })
}

export const createPostServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabasePostAdapter(client),
    nest: () => createNestPostAdapter(),
  })
}

export const createTodoServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseTodoAdapter(client),
    nest: () => createNestTodoAdapter(),
  })
}

export const createWordServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseWordAdapter(client),
    nest: () => createNestWordAdapter(),
  })
}

export const createCommentServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseCommentAdapter(client),
    nest: () => createNestCommentAdapter(),
  })
}

export const createLikeServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseLikeAdapter(client),
    nest: () => createNestLikeAdapter(),
  })
}

export const createReportServerAdapter = async () => {
  const adapter = await createServerAdapter()
  return adapter({
    supabase: (client) => createSupabaseReportAdapter(client),
    nest: () => createNestReportAdapter(),
  })
}

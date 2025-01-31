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
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { Provider } from '@/src/types/enums/index'

const databaseProvider =
  (process.env.NEXT_PUBLIC_DB_PROVIDER as Provider) ?? Provider.SUPABASE

export const createAdapter = <T>(factory: {
  supabase: (client: SupabaseClient) => T
  nest: () => T
}): T => {
  return databaseProvider === Provider.SUPABASE
    ? factory.supabase(supabase)
    : factory.nest()
}

export const authAdapter = createAdapter({
  supabase: (client) => createSupabaseAuthAdapter(client),
  nest: () => createNestAuthAdapter(),
})
export const userAdapter = createAdapter({
  supabase: (client) => createSupabaseUserAdapter(client),
  nest: () => createNestUserAdapter(),
})
export const emotionAdapter = createAdapter({
  supabase: (client) => createSupabaseEmotionAdapter(client),
  nest: () => createNestEmotionAdapter(),
})
export const followAdapter = createAdapter({
  supabase: (client) => createSupabaseFollowAdapter(client),
  nest: () => createNestFollowAdapter(),
})
export const gardenAdapter = createAdapter({
  supabase: (client) => createSupabaseGardenAdapter(client),
  nest: () => createNestGardenAdapter(),
})
export const postAdapter = createAdapter({
  supabase: (client) => createSupabasePostAdapter(client),
  nest: () => createNestPostAdapter(),
})
export const todoAdapter = createAdapter({
  supabase: (client) => createSupabaseTodoAdapter(client),
  nest: () => createNestTodoAdapter(),
})
export const wordAdapter = createAdapter({
  supabase: (client) => createSupabaseWordAdapter(client),
  nest: () => createNestWordAdapter(),
})
export const commentAdapter = createAdapter({
  supabase: (client) => createSupabaseCommentAdapter(client),
  nest: () => createNestCommentAdapter(),
})
export const likeAdapter = createAdapter({
  supabase: (client) => createSupabaseLikeAdapter(client),
  nest: () => createNestLikeAdapter(),
})
export const reportAdapter = createAdapter({
  supabase: (client) => createSupabaseReportAdapter(client),
  nest: () => createNestReportAdapter(),
})

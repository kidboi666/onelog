import { NestAuthAdapter } from '@/src/api/auth-api'
import { SupabaseClient } from '@supabase/supabase-js'
import { isServer } from '@tanstack/react-query'
import { createBrowserClient } from '@/src/lib/supabase/client'
import { SupabaseAuthAdapter } from '@/src/services/queries/auth/me-query'
import { IAuthBaseAdapter } from '@/src/types/auth'
import { createServerClient } from '../lib/supabase/server'

enum Provider {
  SUPABASE = 'supabase',
  NEST = 'nest',
}

function extracted(provider: Provider, supabaseClient?: SupabaseClient) {
  switch (provider) {
    case Provider.SUPABASE:
      if (supabaseClient) {
        return new SupabaseAuthAdapter(supabaseClient)
      }

      let client: SupabaseClient

      if (isServer) {
        client = createServerClient()
      } else {
        client = createBrowserClient()
      }

      return new SupabaseAuthAdapter(client)
    case Provider.NEST:
    default:
      return new NestAuthAdapter()
  }
}

export function createAuthAdapter(
  supabaseClient?: SupabaseClient,
): IAuthBaseAdapter {
  const provider = process.env.NEXT_PUBLIC_DB_PROVIDER ?? Provider.SUPABASE

  return extracted(provider as Provider, supabaseClient)
}

export function createPostAdapter(supabaseClient?: SupabaseClient) {
  const provider = process.env.NEXT_PUBLIC_DB_PROVIDER ?? Provider.SUPABASE

  return extracted(provider as Provider, supabaseClient)
}

export function createTodoAdapter(supabaseClient?: SupabaseClient) {
  const provider = process.env.NEXT_PUBLIC_DB_PROVIDER ?? Provider.SUPABASE

  return extracted(provider as Provider, supabaseClient)
}

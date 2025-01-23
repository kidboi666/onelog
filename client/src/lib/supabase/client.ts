import { createBrowserClient as createClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/src/types/supabase'

let client: SupabaseClient | undefined

export const createBrowserClient = () => {
  if (client) {
    return client
  }

  client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return client
}

export const supabase = createBrowserClient()

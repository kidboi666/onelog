import { SUPABASE_CONFIG } from '@/src/config/index'
import { createBrowserClient as createClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/src/types/supabase'

let client: SupabaseClient | undefined

export const createBrowserClient = () => {
  if (client) {
    return client
  }

  client = createClient<Database>(SUPABASE_CONFIG.url!, SUPABASE_CONFIG.key!)

  return client
}

export const supabase = createBrowserClient()

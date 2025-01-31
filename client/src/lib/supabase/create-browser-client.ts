import { SUPABASE_CONFIG } from '@/src/config/index'
import { createBrowserClient as createClient } from '@supabase/ssr'
import { Database } from '@/src/types/supabase'

export const createBrowserClient = () => {
  return createClient<Database>(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key)
}

export const supabase = createBrowserClient()

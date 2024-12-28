import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { createServerClient } from '@/src/lib/supabase/server'

export default function initClient() {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  return { queryClient, supabase }
}

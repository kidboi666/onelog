import { createServerClient } from '@/src/lib/supabase/server'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'

export default function initClient() {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  return { queryClient, supabase }
}

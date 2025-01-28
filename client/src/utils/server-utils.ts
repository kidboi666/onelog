import { createServerClient } from '@/src/lib/supabase/create-server-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'

export const initClientForServer = () => {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  return { queryClient, supabase }
}

import { createGardenAdapter } from '@/src/adapters/index'
import { QUERY_KEY } from '@/src/constants/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { Tables } from '@/src/types/supabase'

export const gardenQuery = {
  getGarden: (supabase: SupabaseClient, userId: string, selectedYear: number) =>
    queryOptions<Tables<'garden'>[]>({
      queryKey: QUERY_KEY.GARDEN(userId, selectedYear),
      queryFn: () =>
        createGardenAdapter(supabase).getGarden({ userId, selectedYear }),
    }),
}

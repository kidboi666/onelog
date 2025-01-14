import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { Tables } from '@/src/types/supabase'

export const gardenQuery = {
  getGarden: (supabase: SupabaseClient, userId: string, selectedYear: number) =>
    queryOptions<Tables<'garden'>[]>({
      queryKey: QUERY_KEY.GARDEN(userId, selectedYear),
      queryFn: async () => {
        const startOfYear = `${selectedYear}-01-01T00:00:00.000Z`
        const endOfYear = `${selectedYear}-12-31T23:59:59.999Z`

        const { data, error } = await supabase
          .from('garden')
          .select()
          .eq('user_id', userId)
          .gte('created_at', startOfYear)
          .lte('created_at', endOfYear)

        if (error) {
          throw error
        }

        return data
      },
    }),
}

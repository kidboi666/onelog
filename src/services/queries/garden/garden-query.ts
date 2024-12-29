import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { Tables } from '@/src/types/supabase'

export const gardenQuery = {
  getGarden: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'garden'>[]>({
      queryKey: [QUERY_KEY.GARDEN(userId)],
      queryFn: async () => {
        const { data, error } = await supabase.from('garden').select().eq('user_id', userId)

        if (error) {
          throw error
        }

        return data
      },
    }),
}

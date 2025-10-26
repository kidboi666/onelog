import { getGarden } from '@/src/services/supabase/garden'
import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'
import { Tables } from '@/src/types/supabase'

export const gardenQuery = {
  getGarden: (userId: string, selectedYear: number) =>
    queryOptions<Tables<'garden'>[]>({
      queryKey: QUERY_KEY.GARDEN(userId, selectedYear),
      queryFn: () => getGarden({ userId, selectedYear }),
    }),
}

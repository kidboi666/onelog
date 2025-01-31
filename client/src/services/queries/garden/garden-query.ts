import { gardenAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'
import { Tables } from '@/src/types/supabase'

export const gardenQuery = {
  getGarden: (userId: string, selectedYear: number) =>
    queryOptions<Tables<'garden'>[]>({
      queryKey: QUERY_KEY.GARDEN(userId, selectedYear),
      queryFn: () => gardenAdapter.getGarden({ userId, selectedYear }),
    }),
}

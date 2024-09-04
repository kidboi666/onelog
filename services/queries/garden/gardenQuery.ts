import { Tables } from '@/types/supabase'
import { queryOptions } from '@tanstack/react-query'

export const gardenQuery = {
  getGarden: (supabase: any, userId: string) =>
    queryOptions<Tables<'garden'>[]>({
      queryKey: ['garden'],
      queryFn: async () => {
        const { data } = await supabase
          .from('garden')
          .select()
          .eq('user_id', userId)
        return data
      },
    }),
}

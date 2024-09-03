import { Tables } from '@/types/supabase'
import { queryOptions } from '@tanstack/react-query'

export const gardenQuery = {
  getGarden: (supabase: any) =>
    queryOptions<Tables<'garden'>[]>({
      queryKey: ['garden'],
      queryFn: async () => {
        const { data } = await supabase.from('garden').select()
        return data
      },
    }),
}

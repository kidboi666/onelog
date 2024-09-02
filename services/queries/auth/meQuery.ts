import { Tables } from '@/types/supabase'
import { queryOptions } from '@tanstack/react-query'

export const meQuery = {
  getUserSession: (supabase: any) =>
    queryOptions({
      queryKey: ['me', 'session'],
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          return null
        }

        return data.user?.user_metadata
      },
    }),
  getUserInfo: (supabase: any, userId: string) =>
    queryOptions<Tables<'user_info'>>({
      queryKey: ['me', 'info'],
      queryFn: async () => {
        const { data } = await supabase
          .from('user_info')
          .select()
          .eq('id', userId)
          .single()

        return data
      },
      enabled: !!userId,
    }),
}

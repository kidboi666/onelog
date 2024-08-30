import { queryOptions } from '@tanstack/react-query'

export const meQuery = {
  getUserSession: (supabase: any) =>
    queryOptions({
      queryKey: ['me', 'session'],
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser()

        return data.user?.user_metadata
      },
    }),
  getUserInfo: (supabase: any, userId: string) =>
    queryOptions({
      queryKey: ['me', 'info'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('user_info')
          .select()
          .eq('id', userId)

        return data
      },
      enabled: !!userId,
    }),
}

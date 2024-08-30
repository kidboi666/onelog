import { queryOptions } from '@tanstack/react-query'

export const meQuery = {
  getUserSession: (supabase: any) =>
    queryOptions({
      queryKey: ['me', 'session'],
      queryFn: async () => {
        const { data, error } = await supabase.auth.getSession()

        return data.session?.user.user_metadata
      },
    }),

  getUserInfo: (supabase: any) =>
    queryOptions({
      queryKey: ['me', 'info'],
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser()

        return data.user?.user_metadata
      },
    }),
}

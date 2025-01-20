import { authApi } from '@/src/api/auth-api'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'

export const meQuery = {
  getSession: () => ({
    queryKey: [QUERY_KEY.AUTH.SESSION],
    queryFn: () => authApi.getSession(),
  }),
  getUserInfo: () => ({
    queryKey: [QUERY_KEY.AUTH.INFO],
    queryFn: () => authApi.getUserInfo(),
  }),
  //
  // getSession: (supabase: SupabaseClient) =>
  //   queryOptions<IUserSession>({
  //     queryKey: QUERY_KEY.AUTH.SESSION,
  //     queryFn: async () => {
  //       const { data, error } = await supabase.auth.getUser()
  //
  //       if (error) {
  //         return null
  //       }
  //
  //       return {
  //         ...data.user?.user_metadata,
  //         userId: data.user?.id,
  //         provider: data.user.app_metadata.provider,
  //       } as IUserSession
  //     },
  //     staleTime: 300000,
  //   }),
  //
  // getUserInfo: (supabase: SupabaseClient, userId?: string) =>
  //   queryOptions<Tables<'user_info'>>({
  //     queryKey: QUERY_KEY.AUTH.INFO,
  //     queryFn: async () => {
  //       const { data } = await supabase
  //         .from('user_info')
  //         .select()
  //         .eq('id', userId)
  //         .single()
  //
  //       return data
  //     },
  //     enabled: !!userId,
  //   }),
}

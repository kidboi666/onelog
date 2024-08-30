import { getQueryClient } from '@/lib/get-query-client'
import { createBrowserClient } from '@/lib/supabase/client'
import { IUpdateUserInfo } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

export default function useUpdateUserInfo() {
  const supabase = createBrowserClient()
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IUpdateUserInfo) => {
      const { data } = await supabase
        .from('user_info')
        .update({
          about_me: params.aboutMe,
          avatar_url: params.avatarUrl,
          nickname: params.nickname,
        })
        .eq('id', params.userId)
        .select()

      return data
    },
  })
}

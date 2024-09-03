import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { IUpdateUserInfo } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { useModal } from '@/store/useModal'
import { supabase } from '@/lib/supabase/client'

export default function useUpdateUserInfo() {
  const queryClient = getQueryClient()
  const { openModal } = useModal()

  return useMutation({
    mutationFn: async (params: IUpdateUserInfo) => {
      const { data } = await supabase.auth.updateUser({
        data: {
          about_me: params.aboutMe,
          avatar_url: params.avatarUrl,
          nickname: params.nickname,
        },
      })

      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'info'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'session'] })
      openModal('success')
    },
  })
}

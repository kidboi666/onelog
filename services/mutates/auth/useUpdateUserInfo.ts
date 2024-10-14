import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { IUpdateUserInfo } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function useUpdateUserInfo() {
  const queryClient = getQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (params: IUpdateUserInfo) => {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          about_me: params.aboutMe,
          avatar_url: params.avatarUrl,
          user_name: params.userName,
        },
      })

      if (error) {
        throw error
      }

      return data
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['me', 'info'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'session'] })
      queryClient.invalidateQueries({
        queryKey: ['user', variables.userId],
      })
      router.replace('success')
    },
    onError: (error, variables, context) => {
      console.log('에러발생', error)
    },
  })
}

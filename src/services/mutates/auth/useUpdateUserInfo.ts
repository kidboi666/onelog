import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { IUpdateUserInfo } from '@/src/types/auth'
import { routes } from '@/src/routes'

export default function useUpdateUserInfo() {
  const queryClient = getQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (params: IUpdateUserInfo) => {
      const { data, error } = await supabase
        .from('user_info')
        .update({
          about_me: params.aboutMe,
          avatar_url: params.avatarUrl,
          user_name: params.userName,
          mbti: params.mbti,
        })
        .eq('id', params.userId)

      if (error) {
        throw error
      }

      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.auth.info })
      queryClient.invalidateQueries({ queryKey: queryKey.auth.session })
      router.replace(routes.modal.success)
    },
    onError: (error) => {
      console.log('에러발생', error)
    },
  })
}

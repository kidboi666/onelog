import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { IUpdateUserInfo } from '@/src/types/auth'
import { ROUTES } from '@/src/routes'

export default function useUpdateUserInfo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()
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
        console.error(error)
        throw error
      }

      return data
    },

    onSuccess: () => {
      const queryKeys = [QUERY_KEY.AUTH.INFO, QUERY_KEY.AUTH.SESSION]
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))

      openToast({
        text: TOAST_MESSAGE.USER_INFO.EDIT.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })

      router.replace(ROUTES.MODAL.SUCCESS)
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.USER_INFO.EDIT.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
  })
}

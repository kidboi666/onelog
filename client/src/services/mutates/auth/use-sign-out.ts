import { createAuthAdapter } from '@/src/adapters'
import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { ROUTES } from '@/src/routes'

export default function useSignOut() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: () => createAuthAdapter(supabase).signOut(),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.AUTH.SIGN_OUT.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
    onSettled: () => {
      queryClient.removeQueries()
      alert('로그아웃 하였습니다.')
      window.location.href = ROUTES.HOME
    },
  })
}

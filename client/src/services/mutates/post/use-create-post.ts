import { createPostAdapter } from '@/src/adapters'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'
import { ICreatePost } from '@/src/types/post'

export default function useCreatePost() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: ICreatePost) =>
      createPostAdapter(supabase).createPost(params),
    onSuccess: (_, variables) => {
      const queryKeys = [
        QUERY_KEY.POST.PUBLIC,
        QUERY_KEY.GARDEN(variables.meId),
        QUERY_KEY.POST.COUNT.TOTAL(variables.meId),
      ]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )

      openToast({
        text: TOAST_MESSAGE.POST.POST.SUCCESS,
        type: ToastType.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.POST.POST.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
  })
}

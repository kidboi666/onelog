import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface IAddpost {
  user_id: string
  title: string | null
  content: string
  emotion_level: string | null
  tags: string[]
  access_type: 'private' | 'public'
  post_type: 'article' | 'journal'
}

export default function useAddPost() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IAddpost) => {
      const { data, error } = await supabase
        .from('post')
        .insert({ ...params })
        .select()

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onSuccess: (_, variables) => {
      const { user_id: userId } = variables
      const queryKeys = [
        QUERY_KEY.POST.PUBLIC,
        QUERY_KEY.GARDEN(userId),
        QUERY_KEY.POST.COUNT.TOTAL(userId),
      ]
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))

      openToast({
        text: TOAST_MESSAGE.POST.POST.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.POST.POST.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
  })
}

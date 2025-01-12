import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { AccessType, PostType } from '@/src/types/post'

interface IUpdatePost {
  user_id: string
  id: number
  title: string | null
  content: string
  emotion_level: string | null
  tags: string[]
  access_type: AccessType
  post_type: PostType
}

export default function useUpdatePost() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IUpdatePost) => {
      const { data, error } = await supabase
        .from('post')
        .update({ ...params })
        .eq('id', params.id)

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onSuccess: (_, variables) => {
      const { id, user_id: meId } = variables
      const queryKeys = [
        QUERY_KEY.POST.PUBLIC,
        QUERY_KEY.POST.DETAIL(id),
        QUERY_KEY.POST.POST_TYPE(PostType.ARTICLE, meId),
        QUERY_KEY.POST.POST_TYPE(PostType.JOURNAL, meId),
      ]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )

      openToast({
        text: TOAST_MESSAGE.POST.UPDATE.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.POST.DELETE.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
  })
}

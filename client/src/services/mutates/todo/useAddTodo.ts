import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface ITodo {
  name: string
  folderId: number
  userId?: string
  index: number
}

export default function useAddTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: ITodo) => {
      const { data, error } = await supabase
        .from('todo')
        .insert({
          name: params.name,
          folder_id: params.folderId,
          user_id: params.userId || '',
          index: params.index,
        })
        .select()

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO.POST.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
    onSuccess: (_, variables) => {
      const queryKeys = [
        QUERY_KEY.TODO.FOLDER(variables.folderId),
        QUERY_KEY.TODO.MAIN,
      ]
      void queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )

      openToast({
        text: TOAST_MESSAGE.TODO.POST.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })
    },
  })
}

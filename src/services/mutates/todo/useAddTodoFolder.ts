import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface ITodoFolder {
  name: string
  color: string
  index: number
  userId: string
}

export default function useAddTodoFolder() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: ITodoFolder) => {
      const { data, error } = await supabase
        .from('todo_folder')
        .insert({
          name: params.name,
          color: params.color,
          index: params.index,
          user_id: params.userId,
        })
        .select()

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKey.todo.main })

      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.POST.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.POST.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
  })
}

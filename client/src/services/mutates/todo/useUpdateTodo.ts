import { createTodoAdapter } from '@/src/adapters/index'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'
import { IUpdateTodo } from '@/src/types/todo'

export default function useUpdateTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IUpdateTodo) =>
      createTodoAdapter(supabase).updateTodo(params),
    onSuccess: (_, variables) => {
      const { folderId } = variables
      const queryKeys = [
        QUERY_KEY.TODO.FOLDER(folderId),
        QUERY_KEY.TODO.IN_PROGRESS,
      ]
      void queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )

      openToast({
        text: TOAST_MESSAGE.TODO.UPDATE.SUCCESS,
        type: ToastType.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO.UPDATE.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
  })
}

import { createTodoAdapter } from '@/src/adapters/index'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'
import { IDeleteTodo } from '@/src/types/todo'

export default function useDeleteTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IDeleteTodo) =>
      createTodoAdapter(supabase).deleteTodo(params),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.TODO.FOLDER(variables.folderId),
      })

      openToast({
        text: TOAST_MESSAGE.TODO.DELETE.SUCCESS,
        type: ToastType.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO.DELETE.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
  })
}

import { createTodoAdapter } from '@/src/adapters/index'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'
import { ICreateTodo } from '@/src/types/todo'

export default function useAddTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: ICreateTodo) =>
      createTodoAdapter(supabase).createTodo(params),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO.POST.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
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
        type: ToastType.SUCCESS,
      })
    },
  })
}

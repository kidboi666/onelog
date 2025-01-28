import { createTodoAdapter } from '@/src/adapters/index'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'
import { ICreateTodoFolder } from '@/src/types/todo'

export default function useAddTodoFolder() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: ICreateTodoFolder) =>
      createTodoAdapter(supabase).createTodoFolder(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.TODO.MAIN })

      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.POST.SUCCESS,
        type: ToastType.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.POST.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
  })
}

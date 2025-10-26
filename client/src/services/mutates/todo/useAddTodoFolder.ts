import { createTodoFolder } from '@/src/services/supabase/todo'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ICreateTodoFolder } from '@/src/types/dtos/todo'
import { Toast } from '@/src/types/enums/index'

export default function useAddTodoFolder() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: ICreateTodoFolder) =>
      createTodoFolder(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.TODO.MAIN })

      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.POST.SUCCESS,
        type: Toast.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.POST.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}

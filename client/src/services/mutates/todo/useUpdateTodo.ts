import { updateTodo } from '@/src/services/supabase/todo'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { IUpdateTodo } from '@/src/types/dtos/todo'
import { Toast } from '@/src/types/enums/index'

export default function useUpdateTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IUpdateTodo) => updateTodo(params),
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
        type: Toast.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO.UPDATE.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}

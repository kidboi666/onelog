import { todoAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { IDeleteTodo } from '@/src/types/dtos/todo'
import { Toast } from '@/src/types/enums/index'

export default function useDeleteTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IDeleteTodo) => todoAdapter.deleteTodo(params),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.TODO.FOLDER(variables.folderId),
      })

      openToast({
        text: TOAST_MESSAGE.TODO.DELETE.SUCCESS,
        type: Toast.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO.DELETE.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}

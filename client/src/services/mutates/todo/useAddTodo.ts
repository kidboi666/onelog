import { todoAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ICreateTodo } from '@/src/types/dtos/todo'
import { Toast } from '@/src/types/enums/index'

export default function useAddTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: ICreateTodo) => todoAdapter.createTodo(params),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO.POST.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
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
        type: Toast.SUCCESS,
      })
    },
  })
}

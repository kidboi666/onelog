import { todoAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { IUpdateTodoFolder } from '@/src/types/dtos/todo'
import { Toast } from '@/src/types/enums/index'
import { ROUTES } from '@/src/routes'

export default function useUpdateTodoFolder() {
  const queryClient = getQueryClient()
  const router = useRouter()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IUpdateTodoFolder) =>
      todoAdapter.updateTodoFolder(params),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.TODO.MAIN })
      router.push(ROUTES.TODO.VIEW.FOLDER(variables.id, variables.color))

      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.UPDATE.SUCCESS,
        type: Toast.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.UPDATE.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}

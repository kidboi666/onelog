import { deleteTodoFolder } from '@/src/services/supabase/todo'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { Toast } from '@/src/types/enums/index'

export default function useDeleteTodoFolder() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (folderId: number) => deleteTodoFolder(folderId),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.DELETE.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.TODO.MAIN })

      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.DELETE.SUCCESS,
        type: Toast.SUCCESS,
      })
    },
  })
}

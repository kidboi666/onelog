import { createTodoAdapter } from '@/src/adapters/index'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'

export default function useDeleteTodoFolder() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (folderId: number) =>
      createTodoAdapter(supabase).deleteTodoFolder(folderId),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.DELETE.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.TODO.MAIN })

      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.DELETE.SUCCESS,
        type: ToastType.SUCCESS,
      })
    },
  })
}

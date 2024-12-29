import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

export default function useDeleteTodoFolder() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (folderId: number) => {
      const { error } = await supabase.from('todo_folder').delete().eq('id', folderId)

      if (error) {
        console.error(error)
        throw error
      }
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.DELETE.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: queryKey.todo.main })

      openToast({ text: TOAST_MESSAGE.TODO_FOLDER.DELETE.SUCCESS, type: TOAST_TYPE.SUCCESS })
    },
  })
}

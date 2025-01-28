import { createTodoAdapter } from '@/src/adapters/index'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'
import { IUpdateTodoFolder } from '@/src/types/todo'
import { ROUTES } from '@/src/routes'

export default function useUpdateTodoFolder() {
  const queryClient = getQueryClient()
  const router = useRouter()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IUpdateTodoFolder) =>
      createTodoAdapter(supabase).updateTodoFolder(params),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.TODO.MAIN })
      router.push(ROUTES.TODO.VIEW.FOLDER(variables.id, variables.color))

      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.UPDATE.SUCCESS,
        type: ToastType.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.UPDATE.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
  })
}

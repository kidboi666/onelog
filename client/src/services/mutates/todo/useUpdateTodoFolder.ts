import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { ROUTES } from '@/src/routes'

interface ITodoFolder {
  name: string
  color: string
  index: number
  id: number
}

export default function useUpdateTodoFolder() {
  const queryClient = getQueryClient()
  const router = useRouter()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: ITodoFolder) => {
      const { data, error } = await supabase
        .from('todo_folder')
        .update({
          name: params.name,
          color: params.color,
          index: params.index,
        })
        .eq('id', params.id)
        .select()

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.TODO.MAIN })
      router.push(ROUTES.TODO.VIEW.FOLDER(variables.id, variables.color))

      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.UPDATE.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO_FOLDER.UPDATE.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
  })
}

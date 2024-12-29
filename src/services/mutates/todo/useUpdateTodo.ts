import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { Tables } from '@/src/types/supabase'

export default function useUpdateTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: Tables<'todo'>) => {
      const { data, error } = await supabase
        .from('todo')
        .update({
          name: params.name,
          folder_id: params.folder_id,
          user_id: params.user_id,
          memo: params.memo,
          is_complete: params.is_complete,
          updated_at: params.updated_at,
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
      const { folder_id } = variables
      const queryKeys = [QUERY_KEY.TODO.FOLDER(folder_id), QUERY_KEY.TODO.IN_PROGRESS]
      void queryKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))

      openToast({
        text: TOAST_MESSAGE.TODO.UPDATE.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.TODO.UPDATE.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
  })
}

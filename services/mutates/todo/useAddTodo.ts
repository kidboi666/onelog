import { supabase } from '@/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

interface ITodo {
  name: string
  folderId: string
  userId: string
  index: number
}

export default function useAddTodo() {
  return useMutation({
    mutationFn: async (params: ITodo) => {
      return supabase
        .from('todo')
        .insert({
          name: params.name,
          folder_id: params.folderId,
          user_id: params.userId,
          index: params.index,
        })
        .select()
    },
  })
}

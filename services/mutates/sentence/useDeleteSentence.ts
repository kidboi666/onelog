import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

export default function useDeleteSentence() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      return supabase.from('sentence').delete().eq('id', id)
    },
    onSettled: () => {},
  })
}

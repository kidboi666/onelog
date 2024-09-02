import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createBrowserClient } from '@/lib/supabase/client'
import { useModal } from '@/store/useModal'
import { ISentence } from '@/types/sentence'
import { useMutation } from '@tanstack/react-query'

export default function useAddSentence() {
  const supabase = createBrowserClient()
  const queryClient = getQueryClient()
  const { closeModal } = useModal()

  return useMutation({
    mutationFn: async (params: ISentence) => {
      const { data } = supabase
        .from('sentence')
        .insert({ ...params })
        .select()

      return new Promise((res) => setTimeout(res, 1000))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentence'] })
      closeModal()
    },
  })
}

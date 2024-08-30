import { getQueryClient } from '@/lib/get-query-client'
import { createBrowserClient } from '@/lib/supabase/client'
import { useModal } from '@/store/useModal'
import { ISentence } from '@/types/sentence'
import { useMutation } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

export default function useAddSentence() {
  const supabase = createBrowserClient()
  const queryClient = getQueryClient()
  const { openModal } = useModal()

  return useMutation({
    mutationFn: async (params: ISentence) => {
      return supabase
        .from('sentence')
        .insert({ ...params })
        .select()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentence'] })
      // openModal('success', { text: '오늘의 한줄을 등록하였습니다.' })
    },
  })
}

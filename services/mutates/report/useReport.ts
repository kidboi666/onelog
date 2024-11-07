import { supabase } from '@/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

interface IReport {
  reporterId?: string
  targetId: string | number
  reason: string
}

export default function useReport() {
  return useMutation({
    mutationFn: async (params: IReport) => {
      return supabase
        .from('report')
        .insert({
          reporter_id: params.reporterId,
          target_id: params.targetId,
          reason: params.reason,
        })
        .select()
    },
  })
}

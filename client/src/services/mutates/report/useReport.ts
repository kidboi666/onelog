import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface IReport {
  reporterId?: string
  targetPostId?: number
  targetCommentId?: number
  reason: string
}

export default function useReport() {
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IReport) => {
      const { data, error } = await supabase
        .from('report')
        .insert({
          reporter_id: params.reporterId,
          target_post_id: params.targetPostId || null,
          target_comment_id: params.targetCommentId || null,
          reason: params.reason,
        })
        .select()

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onSuccess: (_, variables) => {
      const { targetCommentId } = variables
      if (targetCommentId) {
        openToast({
          text: TOAST_MESSAGE.REPORT.COMMENT.SUCCESS,
          type: TOAST_TYPE.SUCCESS,
        })
      } else {
        openToast({
          text: TOAST_MESSAGE.REPORT.POST.SUCCESS,
          type: TOAST_TYPE.SUCCESS,
        })
      }
    },
    onError: (error, variables) => {
      const { targetCommentId } = variables
      if (targetCommentId) {
        openToast({
          text: TOAST_MESSAGE.REPORT.COMMENT.EXCEPTION,
          message: error.message,
          type: TOAST_TYPE.ERROR,
        })
      } else {
        openToast({
          text: TOAST_MESSAGE.REPORT.POST.EXCEPTION,
          message: error.message,
          type: TOAST_TYPE.ERROR,
        })
      }
    },
  })
}

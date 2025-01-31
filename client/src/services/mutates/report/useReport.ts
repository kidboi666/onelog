import { reportAdapter } from '@/src/adapters/create-client-adapter'
import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/src/store/hooks/useToast'
import { IReport } from '@/src/types/dtos/report'
import { Toast } from '@/src/types/enums/index'

export default function useReport() {
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IReport) => reportAdapter.sendReport(params),
    onSuccess: (_, variables) => {
      const { targetCommentId } = variables
      if (targetCommentId) {
        openToast({
          text: TOAST_MESSAGE.REPORT.COMMENT.SUCCESS,
          type: Toast.SUCCESS,
        })
      } else {
        openToast({
          text: TOAST_MESSAGE.REPORT.POST.SUCCESS,
          type: Toast.SUCCESS,
        })
      }
    },
    onError: (error, variables) => {
      const { targetCommentId } = variables
      if (targetCommentId) {
        openToast({
          text: TOAST_MESSAGE.REPORT.COMMENT.EXCEPTION,
          message: error.message,
          type: Toast.ERROR,
        })
      } else {
        openToast({
          text: TOAST_MESSAGE.REPORT.POST.EXCEPTION,
          message: error.message,
          type: Toast.ERROR,
        })
      }
    },
  })
}

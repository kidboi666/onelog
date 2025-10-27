import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendReport } from "@/entities/report/api/report-api";
import { REPORT_TOAST_MESSAGE } from "@/entities/report/model/constants";
import type { IReport } from "@/entities/report/model/types";

export const useReport = () => {
  return useMutation({
    mutationFn: (params: IReport) => sendReport(params),
    onSuccess: (_, variables) => {
      const { targetCommentId } = variables;
      if (targetCommentId) {
        toast.success(REPORT_TOAST_MESSAGE.COMMENT.SUCCESS);
      } else {
        toast.success(REPORT_TOAST_MESSAGE.POST.SUCCESS);
      }
    },
    onError: (error, variables) => {
      const { targetCommentId } = variables;
      if (targetCommentId) {
        toast.error(REPORT_TOAST_MESSAGE.COMMENT.EXCEPTION, {
          description: error.message,
        });
      } else {
        toast.error(REPORT_TOAST_MESSAGE.POST.EXCEPTION, {
          description: error.message,
        });
      }
    },
  });
};

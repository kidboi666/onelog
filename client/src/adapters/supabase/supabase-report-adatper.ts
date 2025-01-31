import { handleError } from '@/src/adapters/query-helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { IReport } from '@/src/types/dtos/report'
import { IReportBaseAdapter } from '@/src/types/services/index'

export const createSupabaseReportAdapter = (
  supabase: SupabaseClient,
): IReportBaseAdapter => {
  const sendReport = async (params: IReport) => {
    const { error } = await supabase
      .from('report')
      .insert({
        reporter_id: params.reporterId,
        target_post_id: params.targetPostId || null,
        target_comment_id: params.targetCommentId || null,
        reason: params.reason,
      })
      .select()

    handleError(error)
  }

  return { sendReport }
}

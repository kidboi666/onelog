import { handleError } from '@/src/services/supabase/helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'
import { IReport } from '@/src/types/dtos/report'

export const sendReport = async (
  params: IReport,
  supabase: SupabaseClient = createBrowserClient(),
) => {
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

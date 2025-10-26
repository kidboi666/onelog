import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'
import { ILike } from '@/src/types/entities/like'
import { processQuery } from '@/src/services/supabase/helpers'

export const handleLike = async (
  params: ILike,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  let query: any = supabase.from('like')

  if (params.isLike) {
    query = query
      .delete()
      .eq('user_id', params.meId)
      .eq('post_id', params.postId)
  } else {
    query = query
      .insert({
        post_id: Number(params.postId),
        user_id: params.meId,
      })
      .select()
  }

  void processQuery(query)
}

import { SupabaseClient } from '@supabase/supabase-js'
import { ILike } from '@/src/types/entities/like'
import { ILikeBaseAdapter } from '@/src/types/services/index'
import { processQuery } from '../query-helpers'

export const createSupabaseLikeAdapter = (
  supabase: SupabaseClient,
): ILikeBaseAdapter => {
  const handleLike = async (params: ILike) => {
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

    return processQuery(query)
  }

  return {
    handleLike,
  }
}

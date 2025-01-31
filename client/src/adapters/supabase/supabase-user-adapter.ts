import { processQuery } from '@/src/adapters/query-helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { IUserInfo } from '@/src/types/entities/auth'
import { IUserBaseAdapter } from '@/src/types/services/index'

export const createSupabaseUserAdapter = (
  supabase: SupabaseClient,
): IUserBaseAdapter => {
  // 대상 유저 정보 가져오기
  const getUserInfo = async (userId: string): Promise<IUserInfo> => {
    const query = supabase.from('user_info').select().eq('id', userId).single()
    return processQuery(query)
  }

  return {
    getUserInfo,
  }
}

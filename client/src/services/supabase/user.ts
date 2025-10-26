import { processQuery } from '@/src/services/supabase/helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'
import { IUserInfo } from '@/src/types/entities/auth'

// 대상 유저 정보 가져오기
export const getUserInfo = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const query = supabase.from('user_info').select().eq('id', userId).single()
  return processQuery<IUserInfo>(query)
}

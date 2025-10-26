import { processQuery } from '@/src/services/supabase/helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'
import { IGetGarden } from '@/src/types/dtos/garden'

// 주어진 유저와 주어진 날짜의 대한 잔디밭 정보 가져오기
export const getGarden = async (
  params: IGetGarden,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<any> => {
  const startOfYear = `${params.selectedYear}-01-01T00:00:00.000Z`
  const endOfYear = `${params.selectedYear}-12-31T23:59:59.999Z`

  const query = supabase
    .from('garden')
    .select()
    .eq('user_id', params.userId)
    .gte('created_at', startOfYear)
    .lte('created_at', endOfYear)

  return processQuery(query)
}

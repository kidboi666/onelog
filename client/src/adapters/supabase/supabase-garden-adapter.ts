import { SupabaseHelpers } from '@/src/adapters/supabase/supabase-helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { IGardenBaseAdapter, IGetGarden } from '@/src/types/garden'

export class SupabaseGardenAdapter
  extends SupabaseHelpers
  implements IGardenBaseAdapter
{
  constructor(private readonly supabase: SupabaseClient) {
    super()
  }

  async getGarden(params: IGetGarden): Promise<any> {
    const startOfYear = `${params.selectedYear}-01-01T00:00:00.000Z`
    const endOfYear = `${params.selectedYear}-12-31T23:59:59.999Z`

    const { data, error } = await this.supabase
      .from('garden')
      .select()
      .eq('user_id', params.userId)
      .gte('created_at', startOfYear)
      .lte('created_at', endOfYear)

    if (error) {
      this.handleError(error)
    }

    return this.transformResponse(data)
  }
}

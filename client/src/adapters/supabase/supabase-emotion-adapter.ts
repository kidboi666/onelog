import { QueryHelpers } from '@/src/adapters/query-helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { IEmotionBaseAdapter } from '@/src/types/emotion'

export class SupabaseEmotionAdapter
  extends QueryHelpers
  implements IEmotionBaseAdapter
{
  constructor(private readonly supabase: SupabaseClient) {
    super()
  }

  async getEmotionAverage(userId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('post')
      .select('emotion_level')
      .neq('emotion_level', null)
      .eq('user_id', userId)

    this.handleError(error)

    let result

    if (data && data?.length > 0) {
      const splitArray = data.map((item) =>
        Number(item.emotion_level?.split('%')[0]),
      )
      const sum = splitArray.reduce((prev, curr) => prev + curr, 0)
      result = Math.floor(sum / splitArray.length)
    } else {
      result = 0
    }

    return result
  }
}

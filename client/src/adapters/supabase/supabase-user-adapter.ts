import { QueryHelpers } from '@/src/adapters/query-helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { IUserInfo } from '@/src/types/auth'
import { IUserBaseAdapter } from '@/src/types/user'

export class SupabaseUserAdapter
  extends QueryHelpers
  implements IUserBaseAdapter
{
  constructor(private readonly supabase: SupabaseClient) {
    super()
  }

  async getUserInfo(userId: string): Promise<IUserInfo> {
    const { data, error } = await this.supabase
      .from('user_info')
      .select()
      .eq('id', userId)
      .single()
    this.handleError(error)
    return data
  }
}

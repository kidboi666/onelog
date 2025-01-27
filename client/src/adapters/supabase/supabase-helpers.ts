import { PostgrestError } from '@supabase/supabase-js'
import { APIError } from '@/src/utils/fetcher'

export class SupabaseHelpers {
  // 스네이크 -> 카멜 케이스 변환 실행기
  protected transformResponse<T>(data: T): T {
    if (Array.isArray(data)) {
      return data.map((item) => {
        return typeof item === 'object' ? this.toCamelCase(item) : item
      }) as T
    }
    if (typeof data === 'object') {
      return this.toCamelCase(data as Record<string, any>) as T
    }
    return data
  }

  // 스네이크 -> 카멜 케이스 변환기
  private toCamelCase<T extends Record<string, any>>(obj: T): T {
    if (!obj || typeof obj !== 'object') {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.toCamelCase(item)) as unknown as T
    }
    const result: Record<string, unknown> = {}

    Object.keys(obj).forEach((key) => {
      const camelCaseKey = key
        .split('_')
        .map((word, i) =>
          i === 0 ? word : word[0].toUpperCase() + word.slice(1),
        )
        .join('')

      const value = obj[key]
      result[camelCaseKey] = this.toCamelCase(value)
    })
    return result as T
  }

  // 쿼리 처리 로직
  protected async processQuery(query: any) {
    const { data, error } = await query
    this.handleError(error)
    return this.transformResponse(data ?? [])
  }

  // 유저 필터
  protected addUserFilter(query: any, authorId?: string, meId?: string | null) {
    if (meId) {
      query = query.eq('like.user_id', meId)
    }
    if (authorId) {
      query = query.eq('user_id', authorId)
    }
    return query
  }

  // 예외 처리
  protected handleError(error: PostgrestError | null) {
    if (error?.code && error?.message) {
      throw new APIError(error.code, error.message, error)
    }
  }
}

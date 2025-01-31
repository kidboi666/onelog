import { APIError } from '@/src/error/index'
import { PostgrestError } from '@supabase/supabase-js'

export const transformResponse = <T>(data: T): T => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      return typeof item === 'object' ? toCamelCase(item) : item
    }) as T
  }
  if (typeof data === 'object') {
    return toCamelCase(data as Record<string, any>) as T
  }
  return data
}

const toCamelCase = <T extends Record<string, any>>(obj: T): T => {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item)) as unknown as T
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
    result[camelCaseKey] = toCamelCase(value)
  })
  return result as T
}

export const processQuery = async <T>(query: any): Promise<T> => {
  const { data, error } = await query
  handleError(error)
  return transformResponse(data ?? [])
}

export const addUserFilter = (
  query: any,
  authorId?: string,
  meId?: string | null,
) => {
  if (meId) {
    query = query.eq('like.user_id', meId)
  }
  if (authorId) {
    query = query.eq('user_id', authorId)
  }
  return query
}

export const handleError = (error: PostgrestError | null) => {
  if (error?.code && error?.message) {
    throw new APIError(error.code, error.message, error)
  }
}

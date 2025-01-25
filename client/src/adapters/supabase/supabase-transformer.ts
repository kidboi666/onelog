export class SupabaseTransformer {
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

  private toCamelCase<T extends Record<string, any>>(obj: T): T {
    if (!obj || typeof obj !== 'object') {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.toCamelCase(item)) as unknown as T
    }
    const result: Record<string, unknown> = {}

    Object.keys(obj).forEach((key) => {
      const transformKey = key
        .split('_')
        .map((word, i) =>
          i === 0 ? word : word[0].toUpperCase() + word.slice(1),
        )
        .join('')

      const value = obj[key]
      result[transformKey] = this.toCamelCase(value)
    })
    return result as T
  }
}

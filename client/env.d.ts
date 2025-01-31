declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_AUTH_PROVIDER: 'nest' | 'supabase'
    NEXT_PUBLIC_TABLE_PROVIDER: 'nest' | 'supabase'
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL: string
  }
}

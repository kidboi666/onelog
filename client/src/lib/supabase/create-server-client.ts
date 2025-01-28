import { SUPABASE_CONFIG } from '@/src/config/index'
import { createServerClient as createClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createServerClient = () => {
  const cookieStore = cookies()

  return createClient(SUPABASE_CONFIG.url!, SUPABASE_CONFIG.key!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch (err) {
          console.warn(err)
        }
      },
    },
  })
}

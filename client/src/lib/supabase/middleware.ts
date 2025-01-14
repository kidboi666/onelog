import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { AUTH_RESTRICTED_ROUTES, PROTECTED_ROUTES, ROUTES } from '@/src/routes'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const attemptedUnauthorizedAccess =
    user && AUTH_RESTRICTED_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))

  if (attemptedUnauthorizedAccess) {
    const url = request.nextUrl.clone()
    url.pathname = ROUTES.HOME
    return NextResponse.redirect(url)
  }

  const isUnauthorized =
    !user && PROTECTED_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isUnauthorized) {
    const url = request.nextUrl.clone()
    url.pathname = ROUTES.MODAL.AUTH.GUARD
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

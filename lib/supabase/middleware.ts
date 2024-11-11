import { AUTH_RESTRICTED_ROUTES, PROTECTED_ROUTES } from '@/constants/routes'
import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(req: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: req,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            req.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request: req,
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

  if (shouldRedirectToHome(user, req)) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  if (shouldRedirectToAuthGuard(user, req)) {
    return NextResponse.redirect(new URL('/modal/auth_guard', req.url))
  }

  return supabaseResponse
}

function shouldRedirectToHome(user: User | null, req: NextRequest) {
  return (
    user &&
    AUTH_RESTRICTED_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route),
    )
  )
}

function shouldRedirectToAuthGuard(user: User | null, req: NextRequest) {
  return (
    !user &&
    PROTECTED_ROUTES.some((route) => req.nextUrl.pathname.startsWith(route))
  )
}

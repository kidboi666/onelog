import type { User } from "@supabase/auth-js";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { AUTH_RESTRICTED_ROUTES, PROTECTED_ROUTES, ROUTES } from "@/app/routes";

const isRestrictedAccess = (user: User | null, path: string) =>
  user && AUTH_RESTRICTED_ROUTES.some((route) => path.startsWith(route));

const isProtectedAccess = (user: User | null, path: string) =>
  !user && PROTECTED_ROUTES.some((route) => path.startsWith(route));

export async function authGuard(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (isRestrictedAccess(user, path)) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.HOME;
    return NextResponse.redirect(url);
  }

  if (isProtectedAccess(user, path)) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.MODAL.AUTH.GUARD;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

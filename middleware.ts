import { NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

export default function middleware(req: NextRequest) {
  return updateSession(req)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export const AUTH_RESTRICTED_ROUTES = [
  '/signup',
  '/signin',
  '/modal/auth_guard',
]

export const PROTECTED_ROUTES = [
  '/write',
  '/edit_profile',
  '/modal/send_message',
  '/modal/report_sentence',
  '/modal/report_comment',
  '/modal/update_password',
  '/modal/delete_comment',
  '/modal/delete_sentence',
]

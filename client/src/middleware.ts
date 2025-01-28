import { authGuard } from '@/src/middlewares/auth-guard'
import { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  return authGuard(req)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

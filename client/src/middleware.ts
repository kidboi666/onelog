import { authGuard } from '@/src/middlewares/auth-guard'
import { xPathname } from '@/src/middlewares/x-pathname'
import { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  const pathnameResult = await xPathname(req)

  const updatedRequest = new NextRequest(req.url, {
    ...req,
    headers: pathnameResult.request.headers,
  })

  return authGuard(updatedRequest)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

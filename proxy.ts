import { NextRequest } from "next/server";
import { authGuard } from "@/app/_routes/middlewares/auth-guard";
import { xPathname } from "@/app/_routes/middlewares/x-pathname";

export default async function proxy(req: NextRequest) {
  const pathnameResult = await xPathname(req);

  const updatedRequest = new NextRequest(req.url, {
    ...req,
    headers: pathnameResult.request.headers,
  });

  return authGuard(updatedRequest);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

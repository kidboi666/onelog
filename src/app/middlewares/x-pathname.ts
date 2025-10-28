import type { NextRequest } from "next/server";

export async function xPathname(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return {
    request: {
      headers: requestHeaders,
    },
  };
}

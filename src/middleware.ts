import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Only canonicalize host once. If already apex, do nothing.
  if (url.hostname === "www.threatvet.com") {
    url.hostname = "threatvet.com";
    // Preserve protocol, path, and search
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Run on all paths
export const config = {
  matcher: ["/:path*"],
};

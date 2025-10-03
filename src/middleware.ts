import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const url = new URL(req.url);
  const host = url.hostname;

  // Canonical host: threatvet.com
  if (host.endsWith(".vercel.app") || host === "www.threatvet.com") {
    url.hostname = "threatvet.com";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};


import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export async function middleware(request) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();
  if (await verifySession(request.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = { matcher: ["/admin", "/admin/:path*"] };

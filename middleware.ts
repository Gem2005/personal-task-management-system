import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  // Paths that don't require authentication
  const publicPaths = ["/", "/login", "/register"]
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isPublicPath) {
    try {
      verify(token, process.env.JWT_SECRET!)
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } catch {
      // Token is invalid, continue to public path
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


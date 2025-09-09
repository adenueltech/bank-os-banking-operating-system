import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get user data from localStorage (in a real app, this would be from cookies/JWT)
  const userCookie = request.cookies.get("bankos_user")

  // For demo purposes, we'll check if the user is logged in via a simple cookie
  // In production, you'd validate JWT tokens here

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/"]

  // Admin routes
  const adminRoutes = ["/admin"]

  // Customer routes
  const customerRoutes = ["/portal"]

  // Check if it's a public route
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next()
  }

  // If no user cookie and trying to access protected routes, redirect to login
  if (
    !userCookie &&
    (adminRoutes.some((route) => pathname.startsWith(route)) ||
      customerRoutes.some((route) => pathname.startsWith(route)))
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If user is logged in, parse user data
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie.value)

      // Admin trying to access customer routes
      if (user.role === "admin" && customerRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }

      // Customer trying to access admin routes
      if (user.role === "customer" && adminRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/portal", request.url))
      }
    } catch (error) {
      // Invalid user data, redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json).*)",
  ],
}

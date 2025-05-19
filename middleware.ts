import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Skip redirects for static assets and API routes
  if (path.startsWith("/_next") || path.startsWith("/api") || path.includes(".") || path === "/entry") {
    return NextResponse.next()
  }

  // Check if the user has a valid session
  const hasActiveSession = request.cookies.get("active-session")

  // If no active session, redirect to entry (this happens on reload or direct URL access)
  if (!hasActiveSession) {
    // Clear the visited-entry cookie to ensure they see the entry page
    const response = NextResponse.redirect(new URL("/entry", request.url))
    response.cookies.delete("visited-entry")
    return response
  }

  // For normal navigation, just continue
  return NextResponse.next()
}

// Run middleware on all routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|videos|images).*)"],
}

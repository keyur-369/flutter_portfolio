import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if any Supabase auth cookie exists
  const cookies = request.cookies.getAll()
  const hasSupabaseCookie = cookies.some((c) => c.name.startsWith('sb-') && c.name.includes('-auth-token'))

  // If visiting /admin/login while logged in, redirect to /admin
  if (pathname === '/admin/login' && hasSupabaseCookie) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

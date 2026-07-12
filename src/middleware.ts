import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Basic auth logic
    const authHeader = request.headers.get('authorization');
    
    if (authHeader) {
      const authValue = authHeader.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (user === 'admin' && pwd === adminPassword) {
        return NextResponse.next();
      }
    }
    
    // Request basic auth
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

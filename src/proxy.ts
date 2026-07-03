import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "");
const publicAdminRoutes = ['/login'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicAdminRoute = publicAdminRoutes.some(route => pathname.startsWith(route));
  const token = request.cookies.get('veritas_token')?.value;

  if (!token && !isPublicAdminRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY, { clockTolerance: 15 });
      const userRole = payload.role as string;

      if (userRole === 'user' && !isPublicAdminRoute) {
        return NextResponse.rewrite(new URL('/404', request.url));
      }

      if (isPublicAdminRoute) {
        const redirectParam = request.nextUrl.searchParams.get('redirect');
        const destination = redirectParam && redirectParam.startsWith('/admin') 
          ? redirectParam 
          : '/admin';
        
        return NextResponse.redirect(new URL(destination, request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("ERRO DE VALIDAÇÃO DO MIDDLEWARE:", error);

      const response = NextResponse.redirect(new URL('/login?expired=true', request.url));
      response.cookies.delete('veritas_token');
      
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
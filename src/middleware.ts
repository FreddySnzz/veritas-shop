import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET_KEY);
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  };
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  
  const publicAdminRoutes = ['/admin/login'];
  const isPublicAdminRoute = publicAdminRoutes.some(route => pathname.startsWith(route));

  const token = request.cookies.get('veritas_token')?.value;

  if (isAdminRoute && !isPublicAdminRoute && !token) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  };

  if (isAdminRoute && !isPublicAdminRoute && token) {
    const isValid = await verifyToken(token);
    
    if (!isValid) {
      const response = NextResponse.redirect(new URL('/admin/login?expired=true', request.url));
      response.cookies.delete('veritas_token');
      return response;
    };
  };

  if (isLoginPage && token) {
    const isValid = await verifyToken(token);
    
    if (isValid) {
      const redirectUrl = request.nextUrl.searchParams.get('redirect');
      const destination = redirectUrl && redirectUrl.startsWith('/admin') 
        ? redirectUrl 
        : '/admin';
      
      return NextResponse.redirect(new URL(destination, request.url));
    } else {
      const response = NextResponse.next();
      response.cookies.delete('veritas_token');
      return response;
    };
  };

  return NextResponse.next();
};

export const config = {
  matcher: ['/admin/:path*'],
};
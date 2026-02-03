import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "");

const publicAdminRoutes = ['/admin/login'];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isAdminRoute = pathname.startsWith('/admin');
  const isPublicAdminRoute = publicAdminRoutes.some(route => pathname.startsWith(route));
  
  const token = request.cookies.get('veritas_token')?.value;

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  if (isAdminRoute && !isPublicAdminRoute) {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      console.log("DEBUG: Token verificado com sucesso!");
      loginUrl.searchParams.set('redirect', pathname);

      return NextResponse.redirect(loginUrl);
    };

    try {
      await jwtVerify(token, SECRET_KEY, { clockTolerance: 15 });

      return NextResponse.next();
    } catch (error) {
      console.error("ERRO DE VALIDAÇÃO DO MIDDLEWARE:", error);

      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('expired', 'true');
      
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('veritas_token');

      return response;
    };
  };

  if (isPublicAdminRoute && token) {
    try {
      await jwtVerify(token, SECRET_KEY, { clockTolerance: 15 });
      console.log("DEBUG2: Token verificado com sucesso!");
      const redirectParam = request.nextUrl.searchParams.get('redirect');
      const destination = redirectParam && redirectParam.startsWith('/admin') 
        ? redirectParam 
        : '/admin';
      
      return NextResponse.redirect(new URL(destination, request.url));
    } catch (error) {
      console.error("Login service error:", error);
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
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  // Proteger rutas del dashboard (solo permitir acceso a administradores)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirigir a la página de login si no hay token
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    
    // Verificar si el usuario es administrador
    if (token.role !== 'admin') {
      // Redirigir a la página principal si no es administrador
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // Proteger rutas de checkout y mi-cuenta (requieren autenticación)
  if (request.nextUrl.pathname.startsWith('/checkout') || 
      request.nextUrl.pathname.startsWith('/mi-cuenta')) {
    if (!token) {
      // Redirigir a la página de login si no hay token
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// Configurar rutas a las que se debe aplicar el middleware
export const config = {
  matcher: ['/dashboard/:path*', '/checkout/:path*', '/mi-cuenta/:path*'],
};
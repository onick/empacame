import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');
    
    // Redirigir a inicio si ya está autenticado y está intentando acceder a una página de auth
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return NextResponse.next();
    }

    // Verificar acceso al dashboard (solo admins)
    if (isDashboardPage) {
      if (!isAuth) {
        // Redirigir a login si no está autenticado
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
      
      if (token.role !== 'admin') {
        // Redirigir a home si no es admin
        return NextResponse.redirect(new URL('/', req.url));
      }
      
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Solo ejecutar en rutas específicas
      authorized: () => true, // Permitir todas las rutas y manejar la autorización en el middleware
    },
  }
);

// Configurar rutas que deben usar middleware
export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/checkout/:path*', '/profile/:path*'],
};

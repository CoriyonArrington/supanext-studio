// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  const marketingPaths = ['/', '/pricing', '/faqs', '/contact', '/showcase'];
  const authPaths = ['/login', '/sign-up', '/forgot-password', '/update-password'];

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    const role = profile?.role;
    const dashboardUrl = role === 'admin' ? '/admin' : '/dashboard';

    if (authPaths.includes(pathname)) {
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    if (marketingPaths.includes(pathname)) {
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    if (role !== 'admin' && pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    const protectedPaths = ['/dashboard', '/admin', '/account'];
    if (protectedPaths.some((path) => pathname.startsWith(path))) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};

// src/app/(auth)/callback/route.ts
import { createClient } from '~/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // After successfully exchanging the code for a session,
      // redirect the user to the root of the site. The middleware will
      // then handle redirecting them to the correct dashboard or
      // the onboarding page if they are a new user.
      return NextResponse.redirect(origin);
    }
  }

  // If there's an error or no code, redirect to an error page
  console.error('Error in auth callback:', 'Could not exchange code for session');
  return NextResponse.redirect(`${origin}/error?message=Could not log you in. Please try again.`);
}
// src/app/(auth)/callback/route.ts
import { createClient } from '~/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  // The 'next' parameter is used by Supabase to store the intended
  // destination URL after a successful login.
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // FIX: Redirect to the 'next' path, which preserves the plan parameter.
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If there's an error or no code, redirect to an error page
  console.error('Error in auth callback:', 'Could not exchange code for session');
  return NextResponse.redirect(`${origin}/login?message=Could not authenticate.`);
}
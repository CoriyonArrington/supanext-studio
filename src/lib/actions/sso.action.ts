// src/lib/actions/sso.action.ts
'use server';

import { createClient } from '~/lib/supabase/server';
import { redirect } from 'next/navigation';
import type { Provider } from '@supabase/supabase-js';
import { headers } from 'next/headers';

export async function ssoSignIn(provider: Provider, plan: string | null) {
  const supabase = await createClient();
  const headerList = await headers();
  const host = headerList.get('host');
  const protocol = headerList.get('x-forwarded-proto') || 'http';

  // FIX: The redirect path must be `/callback`, not `/auth/callback`,
  // because the `(auth)` folder is a route group and not part of the URL.
  let redirectTo = `${protocol}://${host}/callback`;
  
  if (plan) {
    redirectTo += `?plan=${plan}`;
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error('SSO Sign-In Error:', error);
    return redirect('/login?message=Could not authenticate with provider');
  }

  return redirect(data.url);
}
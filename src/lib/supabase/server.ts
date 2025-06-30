'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '~/lib/database.types';

export async function createClient() {
  // Await the Next.js cookie store
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Return all incoming cookies
        getAll() {
          return cookieStore.getAll();
        },
        // Apply all outgoing cookies
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // If called from a Server Component (no response cookies), ignore
          }
        },
      },
    }
  );
}

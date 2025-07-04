'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '~/lib/database.types';

// NOTE: The function is now called createBrowserClient
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
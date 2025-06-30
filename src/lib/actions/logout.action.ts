'use server';

import { createClient } from '~/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Revalidate the entire application layout to ensure the
  // header and all server components are re-rendered.
  revalidatePath('/', 'layout');
  
  // Redirect to the homepage after logout.
  redirect('/');
}

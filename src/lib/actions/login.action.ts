// src/lib/actions/login.action.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '~/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data: { session }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !session) {
    return { success: false, message: 'Could not authenticate user. Please check your credentials.' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();
    
  if (!profile) {
    await supabase.auth.signOut();
    return { success: false, message: 'Could not find user profile. Please contact support.' };
  }

  // Update user's JWT with their role for RLS
  await supabase.auth.updateUser({
      data: { role: profile.role }
  });

  revalidatePath('/', 'layout');

  // FIX: Correctly redirect based on the 'admin' or 'member' role
  const dashboardUrl = profile.role === 'admin' ? '/admin' : '/dashboard';
  redirect(dashboardUrl);
}
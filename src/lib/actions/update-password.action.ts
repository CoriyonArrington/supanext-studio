'use server';

import { createClient } from '@/lib/supabase/server';

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { success: false, message: 'Could not update password. Please try again.' };
  }

  return { success: true };
}
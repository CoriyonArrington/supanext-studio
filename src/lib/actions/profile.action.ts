'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '~/lib/supabase/server';

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'User not authenticated.' };
  }

  const updates: { full_name?: string; avatar_url?: string } = {};
  // FIX: Changed from `any` to `unknown` to satisfy ESLint
  const authUpdates: { email?: string; data: Record<string, unknown> } = {
    data: { ...user.user_metadata },
  };

  const fullName = formData.get('fullName');
  const email = formData.get('email');
  const avatarUrl = formData.get('avatarUrl');

  if (fullName) {
    updates.full_name = fullName as string;
    authUpdates.data.full_name = fullName as string;
  }
  if (avatarUrl) {
    updates.avatar_url = avatarUrl as string;
    authUpdates.data.avatar_url = avatarUrl as string;
  }
  if (email && email !== user.email) {
    authUpdates.email = email as string;
  }

  const { error: authError } = await supabase.auth.updateUser(authUpdates);
  if (authError) {
    return { success: false, message: `Auth error: ${authError.message}` };
  }
  
  if (Object.keys(updates).length > 0) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (profileError) {
      return { success: false, message: `Profile error: ${profileError.message}` };
    }
  }

  revalidatePath('/account');
  revalidatePath('/dashboard');
  return { success: true, message: 'Profile updated successfully.' };
}

// src/lib/actions/settings.action.ts
'use server';

import { createClient } from '~/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface ActionResult {
  success: boolean;
  message: string;
}

export async function updateNotificationSettings(
  settings: {
    email_notifications_enabled?: boolean;
    push_notifications_enabled?: boolean;
  }
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'User not authenticated.' };
  }

  const { error } = await supabase
    .from('profiles')
    .update(settings)
    .eq('id', user.id);

  if (error) {
    return { success: false, message: 'Failed to update settings.' };
  }

  revalidatePath('/account');
  return { success: true, message: 'Settings updated.' };
}
'use server';

import { createClient } from '@/lib/supabase/server';

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  const supabase = await createClient();

  // Make sure to set NEXT_PUBLIC_SITE_URL in your environment variables
  const origin = process.env.NEXT_PUBLIC_SITE_URL!;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/update-password`,
  });

  if (error) {
    return {
      success: false,
      message: 'Could not send password reset link. Please try again.',
    };
  }

  return { success: true };
}
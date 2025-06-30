// src/lib/actions/signup.action.ts
'use server';

import { createClient } from '~/lib/supabase/server';

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  // FIX: Get the plan from the form data
  const plan = formData.get('plan') as string | null;

  const origin = process.env.NEXT_PUBLIC_SITE_URL!;
  const supabase = await createClient();

  // FIX: Append the plan to the redirect URL if it exists
  let emailRedirectTo = `${origin}/callback`;
  if (plan) {
    emailRedirectTo += `?plan=${plan}`;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: 'Check your email to complete the sign-up process.',
  };
}
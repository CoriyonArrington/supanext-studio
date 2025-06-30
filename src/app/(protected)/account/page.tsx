// src/app/(protected)/account/page.tsx
import { createClient } from '~/lib/supabase/server';
import { AccountForm } from '~/components/account/account-form';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch the user's complete profile and subscription data
  const profilePromise = supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const subscriptionPromise = supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const [{ data: profile }, { data: subscription }] = await Promise.all([
    profilePromise,
    subscriptionPromise
  ]);

  // Pass the user and the full profile/subscription data as props
  return <AccountForm user={user} profile={profile} subscription={subscription} />;
}
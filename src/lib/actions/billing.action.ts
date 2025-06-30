// src/lib/actions/billing.action.ts
'use server';

import { createClient } from '~/lib/supabase/server';
import { stripe } from '~/lib/stripe';

// Define a consistent return type for our actions
type ActionResult = {
  error?: string;
  url?: string | null;
};

/**
 * Creates a Stripe Checkout session for a LOGGED-IN user to start a subscription.
 */
export async function createCheckoutSession(
  priceId: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to subscribe.' };
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single();

  let stripeCustomerId = subscription?.stripe_customer_id;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: { userId: user.id },
    });
    stripeCustomerId = customer.id;

    await supabase.from('subscriptions').insert({
      user_id: user.id,
      stripe_customer_id: stripeCustomerId,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${siteUrl}/dashboard?message=Successfully+subscribed!`,
      cancel_url: `${siteUrl}/pricing`,
    });

    return { url: session.url };
  } catch (err) {
    console.error('Stripe Error:', err);
    return { error: 'Something went wrong with the checkout process.' };
  }
}

/**
 * Creates a Stripe Checkout session for a GUEST (not logged in) for a one-time purchase.
 */
export async function createGuestCheckoutSession(
  priceId: string
): Promise<ActionResult> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${siteUrl}/?message=Purchase+successful!`,
      cancel_url: `${siteUrl}/pricing`,
    });

    return { url: session.url };
  } catch (err) {
    console.error('Stripe Error:', err);
    return { error: 'Something went wrong with the checkout process.' };
  }
}

/**
 * Creates a Stripe Customer Portal session for a logged-in user to manage their billing.
 */
export async function createStripePortalSession(): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to manage your subscription.' };
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single();

  if (!subscription?.stripe_customer_id) {
    return { error: 'You do not have an active subscription to manage.' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  try {
    const { url } = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${siteUrl}/account`,
    });
    return { url };
  } catch (err) {
    console.error('Stripe Portal Error:', err);
    return { error: 'Something went wrong with the billing portal.' };
  }
}
// src/app/api/webhooks/stripe/route.ts

import { stripe } from '~/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import type { Stripe } from 'stripe';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();

  // Await headers() so .get() exists
  const headerList = await headers();
  const signature = headerList.get('Stripe-Signature');
  if (!signature) {
    console.error('Missing Stripe-Signature header');
    return NextResponse.json(
      { error: 'Missing Stripe-Signature header' },
      { status: 400 }
    );
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.warn('⚠️ Webhook signature verification failed:', message);
    return NextResponse.json(
      { error: `Webhook error: ${message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const item = subscription.items.data[0];
      const periodEnd = item.current_period_end!;
      const priceId = item.price.id;

      const { error } = await supabaseAdmin
        .from('subscriptions')
        .update({
          status: subscription.status,
          stripe_subscription_id: subscription.id,
          stripe_price_id: priceId,
          current_period_end: new Date(periodEnd * 1000),
        })
        .eq('stripe_customer_id', subscription.customer as string);

      if (error) {
        console.error(
          'Webhook DB Error (checkout.session.completed):',
          error
        );
        return NextResponse.json(
          { error: 'Database error on subscription update' },
          { status: 500 }
        );
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subscriptionId = (invoice as any).subscription as string;
      if (!subscriptionId) {
        console.warn(`Invoice ${invoice.id} has no subscription ID.`);
        break;
      }

      const subscription = await stripe.subscriptions.retrieve(
        subscriptionId
      );
      const periodEnd = subscription.items.data[0].current_period_end!;

      const { error } = await supabaseAdmin
        .from('subscriptions')
        .update({
          status: subscription.status,
          current_period_end: new Date(periodEnd * 1000),
        })
        .eq('stripe_subscription_id', subscription.id);

      if (error) {
        console.error(
          'Webhook DB Error (invoice.payment_succeeded):',
          error
        );
        return NextResponse.json(
          { error: 'Database error on renewal' },
          { status: 500 }
        );
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

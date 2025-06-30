// src/lib/stripe.ts
import Stripe from 'stripe';

// Initialize Stripe with the secret key.
// By omitting the apiVersion, the library defaults to the version
// set in your Stripe account dashboard, which resolves the type error
// and is the recommended practice.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
// src/components/billing/checkout-handler.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { useToast } from '@chakra-ui/react';
import { createCheckoutSession } from '~/lib/actions/billing.action';

// This component is designed to be placed on the page a user lands on after signing up (e.g., /dashboard).
// It checks for a 'plan' query parameter and automatically redirects the user to checkout if one is found.
export function CheckoutHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const planId = searchParams.get('plan');
    const priceId = searchParams.get('priceId'); // You might use this name from other flows

    // Determine the Stripe Price ID based on the plan name in the URL
    // In a real app, you might have a more robust mapping here.
    const getPriceIdForPlan = (plan: string | null) => {
      if (plan === 'pro') {
        // This should be your Stripe Price ID for the Pro Subscription
        return 'YOUR_STRIPE_PRICE_ID_PRO_SUB'; // Make sure this matches the ID in your seed.sql
      }
      // Return the priceId directly if it was passed
      if (priceId) {
        return priceId;
      }
      return null;
    };

    const stripePriceId = getPriceIdForPlan(planId);

    if (stripePriceId && !isPending) {
      startTransition(async () => {
        const result = await createCheckoutSession(stripePriceId);
        if (result.error) {
          toast({
            title: 'Error',
            description: result.error,
            status: 'error',
            isClosable: true,
          });
        } else if (result.url) {
          // On success, redirect to the Stripe Checkout page
          router.push(result.url);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router, toast]);

  // This component renders nothing, it only handles the redirect logic.
  return null;
}
// src/app/(marketing)/pricing/page.tsx
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { createClient } from '~/lib/supabase/server';
import { notFound } from 'next/navigation';

// FIX: Removed unused 'Hero' import
import { PricingCard } from '~/components/ui/pricing-card';
import { CtaSection } from '~/components/ui/cta-section';
import { Section } from '~/components/ui/section';
import { Accordion, type AccordionItemData } from '~/components/ui/accordion';
import { OneTimePurchaseHero } from '~/components/marketing/pricing/one-time-purchase-hero';
import { FeatureComparisonTable } from '~/components/marketing/pricing/feature-comparison-table';
import { TestimonialsSection } from '~/components/ui/testimonials-section';

// --- Type Definitions ---
interface OneTimePlan {
  headline: string;
  subheadline: string;
  description: string;
  price: string;
  original_price?: string;
  cta_text: string;
  stripePriceId: string;
  features: { name: string; description: string; }[];
}
interface SubscriptionTier {
  name: string;
  price: string;
  price_description: string;
  features: string[];
  cta_text: string;
  cta_link: string;
  is_featured?: boolean;
  stripePriceId: string | null;
}
interface FeatureCategory {
  name: string;
  features: { name: string; hobby: boolean | string; pro: boolean | string; enterprise: boolean | string; }[];
}
interface PricingFAQ {
  question: string;
  answer: string;
}
interface PricingPageContent {
  one_time_plan?: OneTimePlan;
  subscription_plans?: { headline: string; tiers: SubscriptionTier[]; };
  feature_comparison?: { headline: string; categories: FeatureCategory[]; };
}

// --- Sub-components ---
const PricingFaqSection = ({ headline, faqs }: { headline: string; faqs: PricingFAQ[]; }) => {
  const accordionItems: AccordionItemData[] = faqs.map((faq) => ({
    title: faq.question,
    content: <Text>{faq.answer}</Text>,
  }));
  return (
    <VStack spacing={8} align="stretch" maxW="container.md" mx="auto">
      <Heading as="h2" size="xl" textAlign="center">{headline}</Heading>
      <Accordion items={accordionItems} />
    </VStack>
  );
};

// --- Main Page Component ---
export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const pagePromise = supabase.from('pages').select('content').eq('slug', 'pricing').single();
  const faqsPromise = supabase.from('marketing_faqs').select('question, answer').eq('category', 'Pricing').order('display_order');
  const [{ data: page }, { data: pricingFaqs }] = await Promise.all([ pagePromise, faqsPromise ]);

  if (!page || !page.content) { notFound(); }

  const content = page.content as PricingPageContent;
  const oneTimePlan = content.one_time_plan;
  const subscriptions = content.subscription_plans;
  const featureComparison = content.feature_comparison;

  return (
    <Box>
      {oneTimePlan && (
        <Section bg="gray.50" _dark={{ bg: 'gray.900' }} py={{ base: 16, md: 24 }}>
          <OneTimePurchaseHero plan={oneTimePlan} />
        </Section>
      )}
      {subscriptions && (
        <Section py={{ base: 16, md: 24 }}>
          <VStack spacing={4} mb={12}>
            <Heading as="h2" size="xl">{subscriptions.headline}</Heading>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="container.md" mx="auto">
            {subscriptions.tiers.map((tier) => (
              <PricingCard
                key={tier.name}
                title={tier.name}
                price={tier.price}
                priceDescription={tier.price_description}
                features={tier.features}
                ctaText={tier.cta_text}
                ctaLink={tier.cta_link}
                isFeatured={tier.is_featured}
                stripePriceId={tier.stripePriceId || ''}
                user={user}
              />
            ))}
          </SimpleGrid>
        </Section>
      )}
      {featureComparison && (
        <Section bg="gray.50" _dark={{ bg: 'gray.800' }} py={{ base: 16, md: 24 }}>
          <VStack spacing={12} align="stretch">
            <Heading as="h2" size="xl" textAlign="center">{featureComparison.headline}</Heading>
            <FeatureComparisonTable categories={featureComparison.categories} />
          </VStack>
        </Section>
      )}
      <Box py={{ base: 16, md: 24 }}>
        <TestimonialsSection />
      </Box>
      {pricingFaqs && pricingFaqs.length > 0 && (
        <Section bg="gray.50" _dark={{ bg: 'gray.800' }} py={{ base: 16, md: 24 }}>
          <PricingFaqSection headline="Pricing Questions" faqs={pricingFaqs} />
        </Section>
      )}
      <CtaSection
        title="Ready to get started?"
        subtitle="Create an account and start building your application in minutes. No credit card required."
        primaryActionText="Start Building Free"
        primaryActionLink="/sign-up"
        secondaryActionText="Contact Us"
        secondaryActionLink="/contact"
      />
    </Box>
  );
}